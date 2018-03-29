import Vue, { PluginFunction } from 'vue'
import TagCloud from './TagCloud.vue'

export { TagCloud }

function install(vue: typeof Vue) {
  vue.component('TagCloud', TagCloud)
}

export default {
  install: install as PluginFunction<void>
}
