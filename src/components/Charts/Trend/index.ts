import Vue, { PluginFunction } from 'vue'
import Trend from './Trend.vue'

export { Trend }

function install(vue: typeof Vue) {
  vue.component('Trend', Trend)
}

export default {
  install: install as PluginFunction<void>
}
