import Vue, { PluginFunction } from 'vue'
import ActiveChart from './ActiveChart.vue'

export { ActiveChart }

function install(vue: typeof Vue) {
  vue.component('ActiveChart', ActiveChart)
}

export default {
  install: install as PluginFunction<void>
}
