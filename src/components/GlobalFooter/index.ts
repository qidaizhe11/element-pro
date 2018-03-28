import Vue, { PluginFunction } from 'vue'
import GlobalFooter from './GlobalFooter.vue'

export { GlobalFooter }

function install(vue: typeof Vue) {
  vue.component('GlobalFooter', GlobalFooter)
}

export default {
  install: install as PluginFunction<void>
}
