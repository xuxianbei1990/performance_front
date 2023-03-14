<template>
  <div class="home">
    <h1>首页</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="year" label="年度"></el-table-column>
      <el-table-column prop="period" label="周期"></el-table-column>
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column prop="step" label="当前步骤"></el-table-column>
      <el-table-column prop="status" label="绩效状态"></el-table-column>
      <el-table-column prop="score" label="总分"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data () {
    return {
      tableData: []
    }
  },
  components: {
  },
  methods: {
    performanceList () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/performance/list?userId=' + this.$store.getters.getUserId
      }).then(response => {
        response.data.forEach(element => {
          this.tableData.push(element)
        })
      })
    }
  },
  mounted () {
    this.performanceList()
  }
}
</script>
