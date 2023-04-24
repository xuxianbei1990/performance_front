import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import TemplateView from '../views/TemplateView.vue'
import TaskPipelineView from '../views/TaskPipelineView.vue'
import PerformanceDetail from '../views/PerformanceDetailView.vue'
import TeamView from '../views/TeamView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      authority: true
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      authority: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'loginView',
    component: LoginView
  },
  {
    path: '/template',
    name: 'templateView',
    component: TemplateView
  },
  {
    path: '/taskPipeline',
    name: 'taskPipelineView',
    component: TaskPipelineView
  },
  {
    path: '/performanceDetail',
    name: 'performanceDetail',
    component: PerformanceDetail
  },
  {
    path: '/team',
    name: 'teamView',
    component: TeamView
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.info(to.meta.authority)
  // console.info(store)
  // console.info('---' + store.state.token)
  if (to.meta.authority) {
    if (window.localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login'
        // query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
