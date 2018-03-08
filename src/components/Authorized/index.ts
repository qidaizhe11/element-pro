import Component from 'vue-class-component'
import Authorized from './Authorized.vue'
import { hasPermission } from './CheckPermissions'

let CURRENT: string = 'NULL'

/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = (currentAuthority: string | any) => {
  if (currentAuthority) {
    if (currentAuthority.constructor.name === 'Function') {
      CURRENT = currentAuthority()
    }
    if (currentAuthority.constructor.name === 'String') {
      CURRENT = currentAuthority
    }
  } else {
    CURRENT = 'NULL'
  }
  return Authorized
}

export { CURRENT, hasPermission }
export default renderAuthorize
