<template>
  <div class="templateView">
    <router-link to="/taskPipeline">任务流</router-link>|
    <router-link to="/template">模板配置</router-link>
    <router-link to="/team">团队配置</router-link>
    <h1>模板配置</h1>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="primary" @click="update">更新</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
          <el-input placeholder="模板名称" v-model="templateName"></el-input>
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
            <el-form-item>
              <el-row type="flex">
                <el-button @click="save">保存</el-button>
                <el-button @click="addDomain">新增</el-button>
              </el-row>
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :key="domain.key"
              :prop="'domains.' + index + '.targetName'"
              :rules="{
                required: true, message: '域名不能为空', trigger: 'blur'
              }"
            >
              <el-row>
                <el-col :span="6">
                  <el-input v-model="domain.targetName"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="domain.metrics"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="domain.weight"></el-input>
                </el-col>

                <el-button @click.prevent="removeDomain(domain)">删除</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
    <el-table :data="tableData" ref="singleTable" style="width: 100%" @row-click="setCurrent">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="templateName" label="模板名称"></el-table-column>
      <el-table-column prop="period" label="周期"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'templateView',
  data () {
    return {
      templateName: '',
      templateId: null,
      tableData: [],
      dialogTitle: '',
      dialogVisible: false,
      selectTemplate: null,
      dynamicValidateForm: {
        domains: [{
          id: null,
          templatePerformanceId: null,
          targetName: '',
          metrics: '',
          weight: ''
        }]
      }
    }
  },
  methods: {
    setCurrent (row, column, event) {
      this.$refs.singleTable.setCurrentRow(row)
      this.selectTemplate = row
    },
    templateList () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/template/performance/list'
      }).then((response) => {
        const result = response.data
        if (result !== null) {
          this.$data.tableData = []

          result.forEach(element => {
            element.period = '月'
            this.$data.tableData.push(element)
          })
        }
      })
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        targetName: '',
        key: Date.now()
      })
    },
    update () {
      this.dialogTitle = '更新'
      this.dialogVisible = true
      this.templateId = this.selectTemplate.templateId
      this.templateName = this.selectTemplate.templateName
      this.dynamicValidateForm.domains = this.selectTemplate.detailList
    },
    removeDomain (item) {
      const index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    add () {
      this.templateName = ''
      this.dynamicValidateForm = {
        domains: [{
          id: null,
          templatePerformanceId: null,
          targetName: '',
          metrics: '',
          weight: ''
        }]
      }
      this.dialogTitle = '新增'
      this.dialogVisible = true
    },
    save () {
      const templateDate = {
        templatePerformanceMain: {
          id: null,
          templateName: '',
          year: 0,
          quarter: 0,
          month: 1
        },
        detailList: []
      }
      templateDate.templatePerformanceMain.templateName = this.templateName
      console.info(templateDate)
      templateDate.detailList = this.dynamicValidateForm.domains
      if (this.selectTemplate != null) {
        templateDate.templatePerformanceMain.id = this.selectTemplate.id
        this.axios({
          method: 'POST',
          url: 'http://localhost:1003/template/performance/update',
          data: templateDate
        }).then(response => {
          const result = response.data
          if (result !== null) {
            this.data = result
          }
        })
      } else {
        this.axios({
          method: 'POST',
          url: 'http://localhost:1003/template/performance/add',
          data: templateDate
        }).then(response => {
          const result = response.data
          if (result !== null) {
            this.data = result
          }
        })
      }
      this.dialogVisible = false
      window.location.reload()
    }
  },
  mounted () {
    this.templateList()
  }
}
</script>
