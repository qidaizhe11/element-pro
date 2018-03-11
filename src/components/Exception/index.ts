import Vue, { PluginFunction } from 'vue'
import Exception from './Exception.vue'

function install(vue: typeof Vue) {
  vue.component('Exception', Exception)
}

export { Exception }

export default {
  install: install as PluginFunction<void>
}
