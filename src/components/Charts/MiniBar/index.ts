import Vue, { PluginFunction } from 'vue'
import MiniBar from './MiniBar.vue'

export { MiniBar }

function install(vue: typeof Vue) {
  vue.component('MiniBar', MiniBar)
}

export default {
  install: install as PluginFunction<void>
}
