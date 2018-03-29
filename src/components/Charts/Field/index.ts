import Vue, { PluginFunction } from 'vue'
import Field from './Field.vue'

export { Field }

function install(vue: typeof Vue) {
  vue.component('Field', Field)
}

export default {
  install: install as PluginFunction<void>
}
