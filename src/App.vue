<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>-->
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  name: 'app',
  created () {
    if (window.localStorage.getItem('token')) {
      // this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(window.localStorage.getItem('token'))))
      this.$store.commit('setToken', window.localStorage.getItem('token'))
      this.$store.commit('setUserId', window.localStorage.getItem('userId'))
      this.$store.commit('setUser', window.localStorage.getItem('userMain'))
    }

    window.addEventListener('beforeunload', () => {
      // window.localStorage.setItem('token', JSON.stringify(this.$store.state))
      window.localStorage.setItem('token', this.$store.state.token)
      window.localStorage.setItem('userId', this.$store.state.userId)
      window.localStorage.setItem('userMain', this.$store.state.userMain)
    })
  },
  methods: {

  },
  destroyed () {
    // localStorage.removeItem('store')
  }
}
</script>
