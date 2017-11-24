import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import { cloneDeep } from 'lodash'

import navData, { Layout } from '../common/nav'

Vue.use(Router)

function isValidRoute(navData: any, path: string): boolean {
  return navData.some((item: any) => item.layout === path) &&
  navData.filter((item: any) => item.layout === path)[0].children
}

function _getRouteData(navData: any, path: string): any {
  if (!isValidRoute(navData, path)) {
    return
  }
  const route = cloneDeep(
    navData.filter((item: any) => item.layout === path)[0]
  )

  let children: any[] = []
  route.children.map((item: any) => {
    let routeData = []
    if (item.children) {
      routeData = item.children.map((childItem: any) => {
        const childPath = item.path + '/' + childItem.path
        const childConfig: RouteConfig = {
          path: childPath,
          component: childItem.component,
          name: childItem.name
        }
        return childConfig
      })
    } else {
      const routeConfig: RouteConfig = {
        path: item.path,
        name: item.name,
        component: item.component
      }
      routeData = [routeConfig]
    }
    children = children.concat(routeData)
  })

  const rootConfig: RouteConfig = {
    path: route.path,
    name: route.name,
    component: route.component,
    children: children
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
