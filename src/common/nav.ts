import Vue, { Component } from 'vue'
import BasicLayout from 'views/layouts/basic-layout/Index.vue'
import BlankLayout from 'views/layouts/blank-layout/Index.vue'

export interface Layout {
  path: string,
  name: string,
  layout: string,
  component: Component
}

const anticon = (name: string) => {
  return `anticon icon-${name}`
}

const navData = [
  {
    path: '/',
    name: '首页',
    component: BasicLayout,
    layout: 'BasicLayout',
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        icon: anticon('home'),
        children: [
          {
            name: '分析页',
            path: 'analysis',
            icon: anticon('areachart'),
            component: () => import('../components/HelloWorld.vue')
          },
          {
            name: '监控页',
            path: 'monitor',
            component: () => import('../components/HelloWorld.vue')
          },
          {
            name: '工作台',
            path: 'workplace',
            component: () => import('../components/HelloWorld.vue')
          }
        ]
      },
      {
        name: '表单页',
        path: 'form',
        icon: anticon('filetext1'),
        children: [
          {
            name: '基础表单',
            path: 'basic-form',
            component: () => import('../components/HelloWorld.vue')
          },
          {
            name: '分步表单',
            path: 'step-form',
            children: [
              {
                name: '确认页',
                path: 'confirm',
                icon: anticon('infocirlceo'),
                component: () => import('../components/HelloWorld.vue')
              },
              {
                name: '结果页',
                path: 'result',
                icon: anticon('checkcircleo'),
                component: () => import('../components/HelloWorld.vue')
              }
            ]
          },
          {
            name: '高级表单',
            path: 'advanced-form',
            component: () => import('../components/HelloWorld.vue')
          }
        ]
      }
    ]
  },
  {
    layout: 'BlankLayout',
    component: BlankLayout,
    children: [
      {
        name: '使用文档',
        path: 'http://pro.ant.design/docs/getting-started',
        target: '_blank',
        icon: anticon('book')
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
