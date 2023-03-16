<template>
  <div class="home">
    <h1>首页</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
      @row-click="setCurrent"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
    >
      <el-table-column align="center" v-if="false" prop="id" label="ID"></el-table-column>
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
    setCurrent (row, column, event) {
      this.$store.commit('setData', row)
      const routeUrl = this.$router.resolve({
        path: '/performanceDetail',
        query: {
          data: row.id
        }
      })
      window.open(routeUrl.href, '_blank')
    },
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
