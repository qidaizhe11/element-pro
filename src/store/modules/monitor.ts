import { Commit, Dispatch } from 'vuex'

import { queryTags } from 'services/api'

export interface State {
  tags: any[]
}

const state: State = {
  tags: []
}

const mutations = {
  saveTags(state: State, tags: any[]) {
    state.tags = tags
  }
}

const actions = {
  async fetchTags(context: { commit: Commit }) {
    try {
      const response = await queryTags()
      const data = response.data.list || []
      context.commit('saveTags', data)
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
