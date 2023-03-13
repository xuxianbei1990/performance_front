import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: false,
    userId: -1,
    userMain: null
  },
  getters: {
    getUserId (s) {
      return s.userId
    },
    getUser (s) {
      return s.userMain
    }
  },
  mutations: {
    setToken (s, d) {
      s.token = d
      // window.localStorage.setItem('token', JSON.stringify(s.token))
      window.localStorage.setItem('token', s.token)
      // console.info(window.localStorage.getItem('token'))
    },
    setUserId (s, d) {
      s.userId = d
    },
    setUser (s, d) {
      s.userMain = d
    }
  },
  actions: {
  },
  modules: {
  }
})
