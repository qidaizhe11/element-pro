import Vue, { PluginFunction } from 'vue'
import Login from './Login.vue'
import LoginTab from './LoginTab.vue'

export { Login, LoginTab }

function install(vue: typeof Vue) {
  vue.component('Login', Login)
  vue.component('LoginTab', LoginTab)
}

export default {
  install: install as PluginFunction<void>
}
