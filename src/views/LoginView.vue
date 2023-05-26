<template>
  <div class="loginView">
    <h1>登录页面</h1>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="3">
        <el-input placeholder="用户名" v-model="username"></el-input>
        <el-input placeholder="密码" v-model="userPwd"></el-input>
        <el-input placeholder="部门" v-model="department" v-show="show">研发一部</el-input>
        <div v-show="show">
          <el-radio v-model="role" label="0">员工</el-radio>
          <el-radio v-model="role" label="1">管理员</el-radio>
          <el-radio v-model="role" label="2">系统管理员</el-radio>
        </div>
        <el-button type="text" @click="login" v-show="loginshow">登录</el-button>
        <el-button type="text" @click="register">注册</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'loginView',
  data () {
    return {
      username: '',
      userPwd: '',
      department: '',
      registerVisible: 'hidden',
      loginshow: true,
      role: 1,
      show: false
    }
  },
  components: {

  },
  methods: {
    login () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1003/user/login?user=' + this.username + '&pwd=' + this.userPwd
      }).then(response => {
        console.log(response.data)
        if (response.data !== null) {
          this.$store.commit('setToken', true)
          this.$store.commit('setUserId', response.data.id)
          this.$store.commit('setUser', response.data)
          const userMain = response.data
          if (userMain.role === 0) {
            router.push('/')
          }
          if (userMain.role === 1) {
            router.push('/')
          }
          if (userMain.role === 2) {
            router.push('/template')
          }
        } else {
          this.open()
        }
      })
    },
    open () {
      this.$message('账号或密码错误')
    },
    register () {
      if (!this.show) {
        this.show = true
        this.loginshow = false
      } else {
        const userMain = {
          userName: '',
          userPwd: '',
          department: '',
          role: 0
        }
        userMain.userName = this.username
        userMain.userPwd = this.userPwd
        userMain.role = this.role
        userMain.department = this.department
        console.info(userMain)
        this.axios({
          method: 'POST',
          data: userMain,
          url: 'http://localhost:1003/user/register'
        }).then(response => {
          if (response.data === 1) {
            this.$message('注册成功')
            this.show = false
            this.loginshow = true
          } else {
            this.$message(response.data)
          }
        }).catch(exception => {
          console.info(exception)
          this.$message(exception)
        })
      }
    }
  }
}
</script>
