import Vue, { PluginFunction } from 'vue'
import MiniArea from './MiniArea.vue'

export { MiniArea }

function install(vue: typeof Vue) {
  vue.component('MiniArea', MiniArea)
}

export default {
  install: install as PluginFunction<void>
}
