import { VNode } from 'vue'
// import PromiseRender from './PromiseRender';
import { CURRENT } from './index'

function isPromise(obj: any) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

const hasPermission = (
  authority: string | string[] | Promise<any> | Function,
  currentAuthority: string
) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return true
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return true
    }
    return false
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return true
    }
    return false
  }

  // Promise 处理
  // if (isPromise(authority)) {
  //   return <PromiseRender ok={target} error={Exception} promise={authority} />
  // }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority)
      if (bool) {
        return true
      }
      return false
    } catch (error) {
      throw error
    }
  }
  throw new Error('unsupported parameters')
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (
  authority: string | string[] | Promise<any> | Function,
  currentAuthority: string,
  target: VNode | null,
  Exception: VNode | null
) => {
  if (hasPermission(authority, currentAuthority)) {
    return target
  }
  return Exception
}

const pass = (authority: string | string[] | Promise<any> | Function) => {
  return hasPermission(authority, CURRENT)
}

export { checkPermissions, hasPermission, pass }

const check = (
  authority: string | string[] | Promise<any> | Function,
  target: VNode | null,
  Exception: VNode | null
) => {
  return checkPermissions(authority, CURRENT, target, Exception)
}

export default check
