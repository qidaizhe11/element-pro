import Vue from 'vue'
import Router from 'vue-router'

import { getRouterData } from '../common/router'

import { getRoutes } from '../utils/utils'

Vue.use(Router)

const routerData: any = getRouterData()
const UserLayout = routerData['/user'].component
const BasicLayout = routerData['/'].component

const basicLayoutRoutes = getRoutes('/', routerData)
const userLayoutRoutes = getRoutes('/user', routerData)

userLayoutRoutes.forEach(item => {
  item.meta.isUserLayout = true
})

const routes = [
  {
    path: '/user',
    name: 'user',
    component: UserLayout,
    children: userLayoutRoutes
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard/analysis',
    children: basicLayoutRoutes
  }
]

const router = new Router({
  routes
})

export default router
