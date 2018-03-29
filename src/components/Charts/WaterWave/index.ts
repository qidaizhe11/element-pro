import Vue, { PluginFunction } from 'vue'
import WaterWave from './WaterWave.vue'

export { WaterWave }

function install(vue: typeof Vue) {
  vue.component('WaterWave', WaterWave)
}

export default {
  install: install as PluginFunction<void>
}
