<template>
  <div class="cell">
    <el-input ref="elInputRef" size="mini" v-model.trim="localCellValue" @blur="blurFn"></el-input>
  </div>
</template>

<script>

export default {
  data () {
    return {
      localCellValue: this.cellValue
    }
  },
  props: {
    cellValue: {
      type: [String, Number],
      default: ''
    },
    saveRowData: Function, // 外部，传递进来一个函数，当这个el-input失去焦点的时候，通过此函数通知外部
    cellDom: Node, // 单元格dom
    row: Object, // 单元格所在行数据
    property: String// 单元格的key
  },
  mounted () {
    // 用户双击后，让其处于获取焦点的状态
    this.$refs.elInputRef.focus()
  },
  methods: {
    blurFn () {
      // 失去焦点，再抛出去，通知外部
      this.saveRowData({
        cellValue: this.localCellValue,
        cellDom: this.cellDom,
        row: this.row,
        property: this.property
      })
    }
  }
}
</script>

<style>
/* 全局修改tabel-cell属性 */
/* .cell {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 8px;
} */
</style>
