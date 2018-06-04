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
      component: () => import('../views/Dashboard/Monitor/index.vue')
    },
    '/dashboard/workplace': {
      component: () => import('../views/Dashboard/Workplace/index.vue'),
      // hideInBreadcrumb: true,
      // name: '工作台',
      authority: 'admin'
    },
    '/form/basic-form': {
      component: () => import('../views/Forms/BasicForm/index.vue')
    },
    '/form/step-form': {
      component: () => import('../views/Forms/StepForm/index.vue'),
      redirect: '/form/step-form/info',
      children: [
        {
          path: 'info',
          name: '分步表单（填写转账信息）',
          component: () => import('../views/Forms/StepForm/Step1.vue')
        },
        {
          path: 'confirm',
          name: '分步表单（确认转账信息）',
          component: () => import('../views/Forms/StepForm/Step2.vue')
        },
        {
          path: 'result',
          name: '分步表单（完成）',
          component: () => import('../views/Forms/StepForm/Step3.vue')
        }
      ]
    },
    '/list/table-list': {
      component: () => import('../views/List/TableList/index.vue')
    },
    '/profile/basic': {
      component: () => import('../views/Profile/BasicProfile/index.vue')
    },
    '/profile/advanced': {
      component: () => import('../views/Profile/AdvancedProfile/index.vue')
    },
    '/result/success': {
      component: () => import('../views/Result/Success/index.vue')
    },
    '/result/fail': {
      component: () => import('../views/Result/Error/index.vue')
    },
    '/exception/403': {
      component: () => import('../views/Exception/403.vue')
    },
    '/exception/404': {
      component: () => import('../views/Exception/404.vue')
    },
    '/exception/500': {
      component: () => import('../views/Exception/500.vue')
    },
    '/user': {
      component: () => import('../layouts/UserLayout/index.vue')
    },
    '/user/login': {
      component: () => import('../views/User/Login/index.vue')
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
      pathRegexp.test(key)
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
