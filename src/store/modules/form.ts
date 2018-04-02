import Vue from 'vue'
import { Commit, Dispatch } from 'vuex'
import { Message } from 'element-ui'

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

const actions = {
  async submitRegularForm(context: { commit: Commit }, payload: any) {
    await fakeSubmitForm(payload)
    Message.success('提交成功')
  }
}

export default {
  namespaced: true,
  state,
  actions
}
