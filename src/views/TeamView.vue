<template>
  <div class="teamView">
    <router-link to="/taskPipeline">任务流|</router-link>
    <router-link to="/template">模板配置|</router-link>
    <router-link to="/team">团队配置|</router-link>
    <h1>部门配置</h1>
    <el-button type="primary" @click="add">新增</el-button>
    <el-button type="primary" @click="deleteData">删除</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="setCurrent"
      :row-style="isActive"
      ref="singleTable"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
    >
      <el-table-column prop="ownerId" label="id"></el-table-column>
      <el-table-column prop="ownerName" label="我的"></el-table-column>
      <el-table-column v-if="false" prop="userId" label="成员id"></el-table-column>
      <el-table-column prop="userName" label="成员名称"></el-table-column>
    </el-table>

    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <el-row>
        <el-col :span="5">
          <el-select v-model="teamValue" placeholder="队伍拥有者">
            <el-option
              v-for="item in teamOptions"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="5">
          <el-select v-model="userValue" placeholder="用户名">
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-col>
        <el-button type="primary" @click="save">保存</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'teamView',
  data () {
    return {
      tableData: [],
      teamValue: '',
      teamOptions: [],
      userValue: '',
      userOptions: [],
      selectTemplate: '',
      dialogVisible: false
    }
  },
  methods: {
    getUser () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/user/list'
      }).then((response) => {
        const result = response.data
        if (result !== null) {
          result.forEach(element => {
            const obj = {}
            obj.value = element.id
            obj.label = element.userName
            this.$data.userOptions.push(obj)
            this.$data.teamOptions.push(obj)
          })
        }
      })
    },
    isActive ({ row }) {
      if (this.selectTemplate === row) {
        return {
          backgroundColor: '#96c7d2'
        }
      }
      if (this.stepItem === row) {
        return {
          backgroundColor: '#96c7d2'
        }
      }
    },
    setCurrent (row, column, event) {
      this.$refs.singleTable.setCurrentRow(row)
      this.selectTemplate = row
    },
    save () {
      const value = {}
      value.ownerId = this.teamValue.value
      value.ownerName = this.teamValue.label
      value.userId = this.userValue.value
      value.userName = this.userValue.label
      this.axios({
        method: 'POST',
        url: 'http://localhost:1003/team/performance/add',
        data: value
      })
      window.location.reload()
    },
    add () {
      this.dialogVisible = true
    },
    deleteData () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/team/performance/delete?id=' + this.selectTemplate.id
      })
      window.location.reload()
    },
    getList () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/team/performance/team'
      }).then(response => {
        const result = response.data
        result.forEach(element => {
          this.tableData.push(element)
        })
      })
    }
  },
  mounted () {
    this.getList()
    this.getUser()
  }
}
</script>
