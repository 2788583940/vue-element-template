import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import Welcome from '../views/welcome/index.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/') {
    window.sessionStorage.clear()
    next()
  } else {
    if (window.sessionStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
