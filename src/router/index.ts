import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import { cloneDeep } from 'lodash'

import navData, { Layout } from '../common/nav'

Vue.use(Router)

function isValidRoute(navData: any, path: string): boolean {
  return navData.some((item: any) => item.layout === path) &&
  navData.filter((item: any) => item.layout === path)[0].children
}

function getPlainChildRoutes(nodeList: any[], parentPath = '') {
  const arr: any[] = []
  nodeList.map((item) => {
    const itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
    if (item.children) {
      arr.push(...getPlainChildRoutes(item.children, itemPath))
    } else {
      const routeConfig: RouteConfig = {
        path: itemPath,
        component: item.component,
        name: item.name
      }
      if (item.redirect) {
        routeConfig.redirect = item.redirect
      }
      arr.push(routeConfig)
    }
  })
  return arr
}

function _getRouteData(navData: any, path: string): any {
  if (!isValidRoute(navData, path)) {
    return
  }
  const route = cloneDeep(
    navData.filter((item: any) => item.layout === path)[0]
  )

  const childRoutes = getPlainChildRoutes(route.children)

  const rootConfig: RouteConfig = {
    path: route.path,
    name: route.name,
    component: route.component,
    children: childRoutes
  }
  if (route.redirect) {
    rootConfig.redirect = route.redirect
  }
  return rootConfig
}

function getRouteData(path: string) {
  return _getRouteData(navData, path)
}

const basicLayoutRoutes = _getRouteData(navData, 'BasicLayout')
// const blankLayoutRoutes = _getRouteData(navData, 'BlankLayout')

const routes = [].concat(basicLayoutRoutes)

export default new Router({
  routes
})

export {
  navData,
  getRouteData
}
