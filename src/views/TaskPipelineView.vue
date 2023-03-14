<template>
  <div class="taskPipelineView">
    <router-link to="/taskPipeline">任务流</router-link>|
    <router-link to="/template">模板配置</router-link>
    <h1>任务流</h1>

    <el-button type="primary" @click="add">新增</el-button>
    <el-button type="primary" @click="doDelete">删除</el-button>
    <el-button type="primary" @click="send">发送</el-button>

    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <el-row>
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
        <el-col :span="5">
          <el-select v-model="templateValue" placeholder="模板">
            <el-option
              v-for="item in templateOptions"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="步骤" v-model="step"></el-input>
        </el-col>
        <el-button type="primary" @click="save">保存</el-button>
      </el-row>
    </el-dialog>
    <el-table
      :data="tableData"
      ref="singleTable"
      style="width: 100%"
      @row-click="setCurrent"
      :row-style="isActive"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="templatePerformanceName" label="模板"></el-table-column>
      <el-table-column prop="step" label="步骤"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'taskPipelineView',
  data () {
    return {
      userValue: null,
      step: 0,
      userOptions: [],
      templateValue: '',
      templateOptions: [],
      tableData: [],
      dialogVisible: false,
      selectTemplate: ''
    }
  },
  methods: {
    send () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/task/pipeline/send'
      })
    },
    isActive ({ row }) {
      if (this.selectTemplate === row) {
        return {
          backgroundColor: '#96c7d2'
        }
      }
    },
    setCurrent (row, column, event) {
      this.$refs.singleTable.setCurrentRow(row)
      this.selectTemplate = row
    },
    add () {
      this.$data.dialogVisible = true
    },
    doDelete () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/task/pipeline/delete?id=' + this.$data.selectTemplate.id
      })
      window.location.reload()
    },
    save () {
      const taskPipeline = {}
      taskPipeline.userId = this.$data.userValue.value
      taskPipeline.userName = this.$data.userValue.label
      taskPipeline.templatePerformanceId = this.$data.templateValue.value
      taskPipeline.templatePerformanceName = this.$data.templateValue.label
      taskPipeline.step = parseInt(this.$data.step)
      console.info(taskPipeline)
      this.axios({
        method: 'POST',
        url: 'http://localhost:1003/task/pipeline/add',
        data: taskPipeline
      }).then((response) => {
        if (response.data !== 0) {
          this.$message('保存成功')
        }
      })
      this.$data.dialogVisible = false
      window.location.reload()
    },
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
          })
        }
      })
    },
    getTemplate () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/template/performance/list'
      }).then((response) => {
        const result = response.data
        if (result !== null) {
          result.forEach(element => {
            const obj = {}
            obj.value = element.id
            obj.label = element.templateName
            this.$data.templateOptions.push(obj)
          })
        }
      })
    },
    getTaskPipeline () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/task/pipeline/list'
      }).then((response) => {
        const result = response.data
        if (result !== null) {
          result.forEach(element => {
            this.$data.tableData.push(element)
          })
        }
      })
    }
  },

  mounted () {
    this.getUser()
    this.getTemplate()
    this.getTaskPipeline()
  }
}
</script>
