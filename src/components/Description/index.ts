import Vue, { PluginFunction } from 'vue'
import Description from '../DescriptionList/Description.vue'

export { Description }

function install(vue: typeof Vue) {
  vue.component('Description', Description)
}

export default {
  install: install as PluginFunction<void>
}
