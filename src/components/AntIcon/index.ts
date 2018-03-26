import Vue, { PluginFunction } from 'vue'
import AntIcon from './AntIcon.vue'

export { AntIcon }

function install(vue: typeof Vue) {
  vue.component('AntIcon', AntIcon)
}

export default {
  install: install as PluginFunction<void>
}
