import { Commit, Dispatch } from 'vuex'

import { queryBasicProfile, queryAdvancedProfile } from 'services/api'

export interface State {
  basicGoods: any[]
  basicProgress: any[]
  advancedOperation1: any[]
  advancedOperation2: any[]
  advancedOperation3: any[]
}

const state: State = {
  basicGoods: [],
  basicProgress: [],
  advancedOperation1: [],
  advancedOperation2: [],
  advancedOperation3: []
}

const mutations = {
  saveBasic(state: State, payload: any) {
    state.basicGoods = payload.basicGoods
    state.basicProgress = payload.basicProgress
  },
  saveAdvanced(state: State, payload: any) {
    state.advancedOperation1 = payload.advancedOperation1
    state.advancedOperation2 = payload.advancedOperation2
    state.advancedOperation3 = payload.advancedOperation3
  }
}

const actions = {
  async fetchBasic(context: { commit: Commit }) {
    try {
      const response = await queryBasicProfile()
      const data = response.data
      context.commit('saveBasic', data)
      return data
    } catch (error) {
      throw error
    }
  },
  async fetchAdvanced(context: { commit: Commit }) {
    try {
      const response = await queryAdvancedProfile()
      const data = response.data
      context.commit('saveAdvanced', data)
      return data
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
