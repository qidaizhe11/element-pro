import Vue, { PluginFunction } from 'vue'
import Divider from './Divider.vue'

export { Divider }

function install(vue: typeof Vue) {
  vue.component('Divider', Divider)
}

export default {
  install: install as PluginFunction<void>
}
