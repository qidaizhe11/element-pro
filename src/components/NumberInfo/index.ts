import Vue, { PluginFunction } from 'vue'
import NumberInfo from './NumberInfo.vue'

export { NumberInfo }

function install(vue: typeof Vue) {
  vue.component('NumberInfo', NumberInfo)
}

export default {
  install: install as PluginFunction<void>
}
