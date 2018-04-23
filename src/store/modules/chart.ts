import { Commit, Dispatch } from 'vuex'

import { fakeChartData } from 'services/api'

export interface State {
  chartData: {
    visitData: any[]
    visitData2: any[]
    salesData: any[]
    searchData: any[]
    offlineData: any[]
    offlineChartData: any[]
    salesTypeData: any[]
    salesTypeDataOnline: any[]
    salesTypeDataOffline: any[]
    radarData: any[]
  }
  loading: boolean
}

const state: State = {
  chartData: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: []
  },
  loading: false
}

const mutations = {
  save(state: State, payload: any) {
    state.chartData = {
      ...state.chartData,
      ...payload
    }
  },
  setLoading(state: State, loading: boolean) {
    state.loading = loading
  }
}

const actions = {
  async fetch(context: { commit: Commit }) {
    try {
      context.commit('setLoading', true)
      const response = await fakeChartData()
      const data = response.data
      context.commit('setLoading', false)
      context.commit('save', data)
      return data
    } catch (error) {
      context.commit('setLoading', false)
      throw error
    }
  },
  async fetchSalesData(context: { commit: Commit }) {
    try {
      context.commit('setLoading', true)
      const response = await fakeChartData()
      const data = response.data
      context.commit('setLoading', false)
      context.commit('save', {
        salesData: data.salesData
      })
      return data
    } catch (error) {
      context.commit('setLoading', false)
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
