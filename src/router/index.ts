import Vue from 'vue'
import Router from 'vue-router'

import { getRouterData } from '../common/router'

import { getRoutes } from '../utils/utils'

Vue.use(Router)

const routerData: any = getRouterData()
// const UserLayout = routerData['/user'].component
const BasicLayout = routerData['/'].component

const basicLayoutRoutes = getRoutes('/', routerData)

const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard/analysis',
    children: basicLayoutRoutes
  }
]

export default new Router({
  routes
})
