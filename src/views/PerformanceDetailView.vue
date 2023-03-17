<template>
  <div id="performanceDetail">
    <h1>绩效明细</h1>
    <el-button type="primary" @click="commit">提交</el-button>
    <el-table
      :data="details"
      style="width: 80%"
      @cell-dblclick="editCell"
      :cell-class-name="cellClassName"
      :header-cell-style="{'text-align':'left'}"
      :cell-style="{'text-align':'left'}"
    >
      <el-table-column prop="id" label="ID" width="50" align="left"></el-table-column>
      <el-table-column prop="targetName" label="指标名称" width="350" align="left"></el-table-column>
      <el-table-column prop="metrics" label="衡量指标" width="400" align="left"></el-table-column>
      <el-table-column prop="weight" label="权重"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
      <el-table-column prop="comment" label="反馈"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import extendComponents from '../components/common/data'

export default {
  name: 'performanceDetail',
  data () {
    return {
      details: [],
      oldCellValue: null,
      id: ''
    }
  },
  methods: {
    closePage () {
      window.opener = null
      window.open('about:blank', '_self')
      window.close()
    },
    commit () {
      this.axios({
        method: 'POST',
        url: 'http://localhost:1003/performance/update/detail',
        data: this.details
      })
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/performance/commit?id=' + this.id
      })
      this.closePage()
    },
    cellClassName ({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex // 自定义指定一个索引，下方能够用到
      column.index = columnIndex
    },
    editCell (row, column, cell, event) {
      if (column.index <= 3) {
        // this.$message({
        //   type: 'warning',
        //   message: '序号列不允许编辑'
        // })
        return
      }
      this.oldCellValue = row[column.property]
      const cellValue = row[column.property]
      // 实例化组件以后，带着参数，再挂载到对应位置
      new extendComponents.InputC({
        propsData: {
          // 使用propsData对象传递参数，子组件在props中可以接收到
          cellValue: cellValue, // 传递单元格的值
          saveRowData: this.saveRowData, // 传递回调函数用于保存行数据，组件中可以触发之
          cellDom: cell, // 传递这个dom元素
          row: row, // 传递双击的行的数据
          property: column.property// 传递双击的是哪个字段
        }
      }).$mount(cell.children[0]) // 5. $mount方法，用于将某个dom挂载到某个dom上
    },
    /**
 * 失去焦点的时候有以下操作
 *    1. 校验新值是否等于原有值，若等于，说明用户未修改，就不发请求。若不等于就发请求，然后更新tableData数据
 *    2. 然后使用$mount方法，挂载一个新的span标签dom在页面上，即恢复原样，而span标签也是实例化的哦
 * */
    saveRowData (params) {
      console.log('继承的子组件传递过来的数据', params)
      // 1. 看看用户是否修改了
      if (params.cellValue === this.oldCellValue) {
        console.log('未修改数据，不用发请求')
      } else {
        console.info(this.details[params.row.index])
        console.info(params.row)
        params.row[params.property] = params.cellValue
      }
      // 2. 恢复dom节点成为原来的样子，有下面两种方式

      new extendComponents.SpanC({
        propsData: {
          cellValue: params.cellValue
        }
      }).$mount(params.cellDom.children[0])
    },
    getDetail (id) {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/performance/detail?id=' + id
      }).then((response) => {
        response.data.forEach(element => {
          this.details.push(element)
        })
      })
    }
  },
  mounted () {
    this.getDetail(this.$route.query.data)
    this.id = this.$route.query.data
  }
}
</script>
