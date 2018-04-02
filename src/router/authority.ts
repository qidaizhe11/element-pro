import * as NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Authorized from 'utils/Authorized'

import router from './index'

const authorized: any = Authorized

router.beforeEach((to, from, next) => {
  NProgress.start()
  const isUser =
    to.matched && to.matched.length > 0 && to.matched[0].path === '/user'
  if (isUser) {
    next()
    NProgress.done()
    return
  }
  if (!authorized.pass(['admin', 'user'])) {
    next({
      path: '/user/login',
      replace: true
    })
    NProgress.done()
    return
  }
  if (authorized.pass(to.meta.authority)) {
    next()
  } else {
    next({
      path: '/exception/403',
      replace: true
    })
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
