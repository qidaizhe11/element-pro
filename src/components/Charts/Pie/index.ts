import Vue, { PluginFunction } from 'vue'
import Pie from './Pie.vue'

export { Pie }

function install(vue: typeof Vue) {
  vue.component('Pie', Pie)
}

export default {
  install: install as PluginFunction<void>
}
