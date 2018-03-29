import Vue, { PluginFunction } from 'vue'
import ChartCard from './ChartCard.vue'

export { ChartCard }

function install(vue: typeof Vue) {
  vue.component('ChartCard', ChartCard)
}

export default {
  install: install as PluginFunction<void>
}
