import { Commit, Dispatch } from 'vuex'

import router from 'router'

import { fakeAccountLogin } from 'services/api'
import { setAuthority } from 'utils/authority'
import { reloadAuthorized } from 'utils/Authorized'

export interface State {
  status: string | boolean | undefined
  type: string | undefined
}

const state: State = {
  status: undefined,
  type: undefined
}

const mutations = {
  changeLoginStatus(state: State, payload: any) {
    payload = payload || {}
    setAuthority(payload.currentAuthority)
    state.status = payload.status
    state.type = payload.type
  }
}

const actions = {
  async login(context: { commit: Commit }, payload: any) {
    const response = await fakeAccountLogin(payload)
    const data = response ? response.data : {}
    context.commit('changeLoginStatus', data)
    // Login successfully
    if (data.status === 'ok') {
      reloadAuthorized()

      // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
      const urlParams = new URL(window.location.href)

      const redirect = urlParams.searchParams.get('redirect')
      // Remove the parameters in the url
      if (redirect) {
        urlParams.searchParams.delete('redirect')
        window.history.replaceState(null, 'redirect', urlParams.href)
        router.push(redirect)
      } else {
        router.push('/')
      }
    }
    return data
  },
  async logout(context: { commit: Commit }) {
    try {
      // get location pathname
      const urlParams = new URL(window.location.href)
      const pathname = router.currentRoute.path
      // add the parameters in the url
      urlParams.searchParams.set('redirect', pathname)
      window.history.replaceState(null, 'login', urlParams.href)
    } finally {
      context.commit('changeLoginStatus', {
        status: false,
        currentAuthority: 'guest'
      })
      reloadAuthorized()
      router.push('/user/login')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
