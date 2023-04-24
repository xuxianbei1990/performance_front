<template>
  <div class="home">
    <h1>首页</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的绩效" name="first">
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
      </el-tab-pane>
      <el-tab-pane label="团队绩效" name="second">
        <el-table
          :data="teamData"
          style="width: 100%"
          @row-click="setCurrent"
          :row-style="isActive"
          ref="singleTable"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
        >
          <el-table-column v-if="false" prop="id" label="ID"></el-table-column>
          <el-table-column prop="teamMemberName" label="成员名称"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="year" label="年度"></el-table-column>
          <el-table-column prop="period" label="周期"></el-table-column>
          <el-table-column prop="activityName" label="活动名称"></el-table-column>
          <el-table-column prop="step" label="当前步骤"></el-table-column>
          <el-table-column prop="status" label="绩效状态"></el-table-column>
          <el-table-column prop="score" label="总分"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data () {
    return {
      tableData: [],
      teamData: [],
      activeName: 'first'
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
    handleClick (tab, event) {
      console.log(tab, event)
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
