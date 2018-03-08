import Authorized from './Authorized.vue'
import check, { hasPermission } from './CheckPermissions'

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

export { CURRENT, check, hasPermission }
export default renderAuthorize
