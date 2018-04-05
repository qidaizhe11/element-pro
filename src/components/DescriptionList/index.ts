import Vue, { PluginFunction } from 'vue'
import DescriptionList from './DescriptionList.vue'

export { DescriptionList }

function install(vue: typeof Vue) {
  vue.component('DescriptionList', DescriptionList)
}

export default {
  install: install as PluginFunction<void>
}
