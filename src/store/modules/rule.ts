import { Commit, Dispatch } from 'vuex'

import { queryRule, addRule, removeRule } from 'services/api'

export interface State {
  list: any[]
  pagination: any
}

const state: State = {
  list: [],
  pagination: {}
}

const mutations = {
  save(state: State, payload: any) {
    state.list = payload.list || []
    state.pagination = payload.pagination || {}
  }
}

const actions = {
  async fetch(context: { commit: Commit }, payload: any) {
    try {
      const response = await queryRule(payload)
      const data = response.data
      context.commit('save', data)
      return data
    } catch (error) {
      throw error
    }
  },
  async add(context: { commit: Commit }, payload: any) {
    try {
      const response = await addRule(payload)
      const data = response.data
      context.commit('save', data)
      return data
    } catch (error) {
      throw error
    }
  },
  async remove(context: { commit: Commit }, payload: any) {
    try {
      const response = await removeRule(payload)
      const data = response.data
      context.commit('save', data)
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
