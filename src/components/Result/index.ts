import Vue, { PluginFunction } from 'vue'
import Result from './Result.vue'

export { Result }

function install(vue: typeof Vue) {
  vue.component('Result', Result)
}

export default {
  install: install as PluginFunction<void>
}
