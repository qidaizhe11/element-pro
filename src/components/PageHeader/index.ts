import Vue, { PluginFunction } from 'vue'
import PageHeader from './PageHeader.vue'

export { PageHeader }

function install(vue: typeof Vue) {
  vue.component('PageHeader', PageHeader)
}

export default {
  install: install as PluginFunction<void>
}
