import Vue, { PluginFunction } from 'vue'
import StandardTable from './StandardTable.vue'

export { StandardTable }

function install(vue: typeof Vue) {
  vue.component('StandardTable', StandardTable)
}

export default {
  install: install as PluginFunction<void>
}
