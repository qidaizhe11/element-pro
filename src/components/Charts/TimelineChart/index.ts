import Vue, { PluginFunction } from 'vue'
import TimelineChart from './TimelineChart.vue'

export { TimelineChart }

function install(vue: typeof Vue) {
  vue.component('TimelineChart', TimelineChart)
}

export default {
  install: install as PluginFunction<void>
}
