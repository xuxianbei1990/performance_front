<template>
  <div class="taskPipelineView">
    <router-link to="/taskPipeline">任务流</router-link>|
    <router-link to="/template">模板配置</router-link>
    <router-link to="/team">团队配置</router-link>
    <h1>任务流</h1>

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
          <el-select v-model="step" placeholder="步骤">
            <el-option
              v-for="item in stepData"
              :key="item.stepValue"
              :label="item.stepName"
              :value="item"
            ></el-option>
          </el-select>
        </el-col>
        <el-button type="primary" @click="save">保存</el-button>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="stepVisible" width="30%">
      <el-row :gutter="5">
        <el-col :span="8">
          <el-input placeholder="步骤值" v-model="stepItem.stepValue"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="步骤名称" v-model="stepItem.stepName"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="stepSave">保存</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <h1>任务流配置</h1>
          <el-button type="primary" @click="add">新增</el-button>
          <el-button type="primary" @click="doDelete">删除</el-button>
          <el-button type="primary" @click="send">发送</el-button>
          <el-table
            :data="tableData"
            ref="singleTable"
            style="width: 90%"
            @row-click="setCurrent"
            :row-style="isActive"
          >
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="templatePerformanceName" label="模板"></el-table-column>
            <el-table-column prop="step" label="步骤" :formatter="stateFormat"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <h1>步骤配置</h1>
          <el-button type="primary" @click="stepAdd">新增</el-button>
          <el-button type="primary" @click="stepUpdate">更新</el-button>
          <el-table
            :data="stepData"
            ref="steptTable"
            style="width: 90%"
            @row-click="setStepCurrent"
            :row-style="isActive"
          >
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="stepValue" label="步骤值"></el-table-column>
            <el-table-column prop="stepName" label="步骤"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taskPipelineView',
  data () {
    return {
      userValue: null,
      step: '',
      userOptions: [],
      templateValue: '',
      templateOptions: [],
      tableData: [],
      stepData: [],
      stepItem: {
        id: '',
        stepValue: '',
        stepName: ''
      },
      dialogVisible: false,
      stepVisible: false,
      selectTemplate: ''
    }
  },
  methods: {
    setStepCurrent (row) {
      this.$refs.steptTable.setCurrentRow(row)
      this.stepItem = row
    },
    getStep () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/template/step/list'
      }).then(response => {
        const result = response.data
        if (result !== null) {
          result.forEach(element => {
            this.$data.stepData.push(element)
          })
        }
      })
    },
    stateFormat (row, column) {
      for (let index = 0; index < this.stepData.length; index++) {
        const element = this.stepData[index]
        if (element.stepValue === row.step) {
          return element.stepName
        }
      }
    },
    stepAdd (templateStep) {
      this.stepItem = {}
      this.stepVisible = true
    },
    stepUpdate (templateStep) {
      this.stepVisible = true
    },
    stepSave () {
      console.info(this.stepItem)
      if (this.stepItem.id === undefined) {
        this.axios({
          method: 'POST',
          url: 'http://localhost:1003/template/step/add',
          data: this.stepItem
        })
      } else {
        this.axios({
          method: 'POST',
          url: 'http://localhost:1003/template/step/update',
          data: this.stepItem
        })
      }
      window.location.reload()
    },
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
    this.getStep()
    this.getUser()
    this.getTemplate()
    this.getTaskPipeline()
  }
}
</script>
