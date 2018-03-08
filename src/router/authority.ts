import { getAuthority } from 'utils/authority'
import { hasPermission } from 'components/Authorized'

import router from './index'

router.beforeEach((to, from, next) => {
  if (hasPermission(to.meta.authority, getAuthority())) {
    next()
  } else {
    next({
      path: '/401',
      replace: true
    })
  }
})
