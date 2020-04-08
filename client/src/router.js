import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          redirect: '/wchart'
        },
        {
          path: '/wchart',
          name: 'wchart',
          component: () => import('./views/Wchart.vue')
        },
        {
          path: '/abook',
          name: 'abook',
          component: () => import('./views/AddressBook.vue')
        },
        {
          path: '/find',
          name: 'find',
          component: () => import('./views/Find.vue')
        },
        {
          path: '/mine',
          name: 'mine',
          component: () => import('./views/Mine.vue')
        }
      ]
    },
    { path: '/login', name: 'login', component: () => import('./views/Login.vue') },
    { path: '/register', name: 'register', component: () => import('./views/Register.vue') },
    { path: '/circle', name: 'circle', component: () => import('./views/Circle.vue') },
    { path: '/publish', name: 'publish', component: () => import('./views/Publish.vue') }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.wxToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router
