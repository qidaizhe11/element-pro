import Vue, { PluginFunction } from 'vue'
import CountDown from './CountDown.vue'

export { CountDown }

function install(vue: typeof Vue) {
  vue.component('CountDown', CountDown)
}

export default {
  install: install as PluginFunction<void>
}
