import Vue, { PluginFunction } from 'vue'
import LoginTab from '../Login/LoginTab.vue'

export { LoginTab }

function install(vue: typeof Vue) {
  vue.component('LoginTab', LoginTab)
}

export default {
  install: install as PluginFunction<void>
}
