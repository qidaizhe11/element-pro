import Vue, { PluginFunction } from 'vue'
import LoginSubmit from '../Login/LoginSubmit.vue'

export { LoginSubmit }

function install(vue: typeof Vue) {
  vue.component('LoginSubmit', LoginSubmit)
}

export default {
  install: install as PluginFunction<void>
}
