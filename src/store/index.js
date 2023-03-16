import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: false,
    userId: -1,
    userMain: null,
    data: ''
  },
  getters: {
    getUserId (s) {
      return s.userId
    },
    getUser (s) {
      return s.userMain
    },
    getData () {
      return this.data
    }
  },
  mutations: {
    setToken (s, d) {
      s.token = d
      // window.localStorage.setItem('token', JSON.stringify(s.token))
      window.localStorage.setItem('token', s.token)
    },
    setUserId (s, d) {
      s.userId = d
      window.localStorage.setItem('userId', s.userId)
    },
    setUser (s, d) {
      s.userMain = d
      window.localStorage.setItem('userMain', s.userMain)
    },
    setData (s, d) {
      s.data = d
    }
  },
  actions: {
  },
  modules: {
  }
})
