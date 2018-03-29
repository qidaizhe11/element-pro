import Vue, { PluginFunction } from 'vue'
import MiniProgress from './MiniProgress.vue'

export { MiniProgress }

function install(vue: typeof Vue) {
  vue.component('MiniProgress', MiniProgress)
}

export default {
  install: install as PluginFunction<void>
}
