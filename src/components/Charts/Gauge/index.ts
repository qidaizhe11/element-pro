import Vue, { PluginFunction } from 'vue'
import Gauge from './Gauge.vue'

export { Gauge }

function install(vue: typeof Vue) {
  vue.component('Gauge', Gauge)
}

export default {
  install: install as PluginFunction<void>
}
