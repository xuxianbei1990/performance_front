import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: false
  },
  getters: {
  },
  mutations: {
    setToken (s, d) {
      s.token = d
      // window.localStorage.setItem('token', JSON.stringify(s.token))
      window.localStorage.setItem('token', s.token)
      // console.info(window.localStorage.getItem('token'))
    }
  },
  actions: {
  },
  modules: {
  }
})
