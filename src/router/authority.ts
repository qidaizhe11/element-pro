import Authorized from 'utils/Authorized'

import router from './index'

const authorized: any = Authorized

router.beforeEach((to, from, next) => {
  if (authorized.pass(to.meta.authority)) {
    next()
  } else {
    next({
      path: '/401',
      replace: true
    })
  }
})
