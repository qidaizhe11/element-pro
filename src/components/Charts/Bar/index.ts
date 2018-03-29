import Vue, { PluginFunction } from 'vue'
import Bar from './Bar.vue'

export { Bar }

function install(vue: typeof Vue) {
  vue.component('Bar', Bar)
}

export default {
  install: install as PluginFunction<void>
}
