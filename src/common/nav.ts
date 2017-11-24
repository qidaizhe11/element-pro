import Vue, { Component } from 'vue'
import BasicLayout from 'views/layouts/basic-layout/Index.vue'
import BlankLayout from 'views/layouts/blank-layout/Index.vue'

export interface Layout {
  path: string,
  name: string,
  layout: string,
  component: Component
}

const navData = [
  {
    path: '/',
    name: '首页',
    component: BasicLayout,
    layout: 'BasicLayout',
    children: [
      {
        name: '检测记录',
        path: 'history',
        component: () => import('../components/HelloWorld.vue')
      },
      {
        name: 'Ping检测',
        path: 'ping',
        component: () => import('../components/HelloWorld.vue')
      },
      {
        name: '操作日志',
        path: 'log',
        component: () => import('../components/HelloWorld.vue')
      },
      {
        name: '设置',
        path: 'settings',
        children: [
          {
            name: '设置',
            path: 'settings',
            component: () => import('../components/HelloWorld.vue')
          },
          {
            name: '管理员',
            path: 'users',
            component: () => import('../components/HelloWorld.vue')
          },
          {
            name: '测试',
            path: 'hehe',
            children: [
              {
                name: '测试子节点',
                path: 'haha',
                component: () => import('../components/HelloWorld.vue')
              }
            ]
          }
        ]
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'blank',
  //   layout: 'BlankLayout',
  //   component: BlankLayout,
  //   hidden: true,
  //   children: [
  //     {
  //       name: '登录',
  //       path: 'login',
  //       component: () => import('../views/login/Index.vue')
  //     }
  //   ]
  // }
]

export default navData
