import Vue from 'vue'
import { Commit, Dispatch } from 'vuex'
import { Message } from 'element-ui'

import router from 'router'

import { fakeSubmitForm } from 'services/api'

interface Step {
  payAccount: string
  receiverAccount: string
  receiverName: string
  amount: string
}

export interface State {
  step: Step
}

const state: State = {
  step: {
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500'
  }
}

const mutations = {
  saveStepFormData(state: State, payload: Step) {
    state.step = {
      ...state.step,
      ...payload
    }
  }
}

const actions = {
  async submitRegularForm(context: { commit: Commit }, payload: any) {
    await fakeSubmitForm(payload)
    Message.success('提交成功')
  },
  async submitStepForm(context: { commit: Commit }, payload: any) {
    await fakeSubmitForm(payload)
    context.commit('saveStepFormData', payload)
    router.push('/form/step-form/result')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
