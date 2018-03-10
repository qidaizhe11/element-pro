import * as pathToRegexp from 'path-to-regexp'
import { getMenuData } from './menu'

function getFlatMenuData(menus: any[]) {
  let keys: any = {}
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item }
      keys = { ...keys, ...getFlatMenuData(item.children) }
    } else {
      keys[item.path] = { ...item }
    }
  })
  return keys
}

export const getRouterData = () => {
  const routerConfig: any = {
    '/': {
      component: () => import('../layouts/BasicLayout/index.vue')
    },
    '/dashboard/analysis': {
      component: () => import('../views/Dashboard/Analysis/index.vue')
    },
    '/dashboard/monitor': {
      component: () => import('../components/HelloWorld.vue')
    },
    '/dashboard/workplace': {
      component: () => import('../views/Dashboard/Workplace/index.vue'),
      // hideInBreadcrumb: true,
      // name: '工作台',
      authority: 'admin'
    },
    '/exception/403': {
      component: () => import('../views/Exception/403.vue')
    }
    // '/user/:id': {
    //   component: () => import('../routes/User/SomeComponent'),
    // },
  }

  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData())

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData: any = {}
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path)
    const menuKey = Object.keys(menuData).find(key =>
      pathRegexp.test(`/${key}`)
    )
    let menuItem: any = {}
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]
    const authority = router.authority || menuItem.authority
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: authority,
      meta: {
        authority: authority
      }
    }
    routerData[path] = router
  })
  return routerData
}
