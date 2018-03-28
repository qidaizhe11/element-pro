import Authorized from 'utils/Authorized'

import router from './index'

const authorized: any = Authorized

router.beforeEach((to, from, next) => {
  const isUser = to.matched && to.matched.length > 0 && to.matched[0].path === '/user'
  if (isUser) {
    next()
    return
  }
  if (!authorized.pass(['admin', 'user'])) {
    next({
      path: '/user/login',
      replace: true
    })
    return
  }
  if (authorized.pass(to.meta.authority)) {
    next()
  } else {
    next({
      path: '/exception/403',
      replace: true
    })
  }
})
