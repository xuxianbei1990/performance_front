<template>
  <div class="loginView">
    <h1>This is an login page</h1>
    <button type="text" @click="login">登录</button>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'loginView',
  components: {

  },
  methods: {
    login () {
      this.$store.commit('setToken', true)
      console.info(this.$store.state.token)
      router.push('/')
    }
  }
}
</script>
