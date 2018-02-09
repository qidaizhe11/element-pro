import { Commit, Dispatch } from 'vuex'

import { queryCurrent } from 'services/user'

export interface State {
  list: any[],
  currentUser: any
}

const state: State = {
  list: [],
  currentUser: {}
}

const mutations = {
  saveCurrentUser(state: State, payload: any) {
    state.currentUser = payload || {}
  }
}

const actions = {
  async fetchCurrent(context: { commit: Commit }) {
    const response = await queryCurrent()
    context.commit('saveCurrentUser', response.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
