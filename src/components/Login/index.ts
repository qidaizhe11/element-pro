import Vue, { PluginFunction } from 'vue'
import Login from './Login.vue'
import LoginTab from './LoginTab.vue'
import LoginItem from './LoginItem'

export { Login, LoginTab, LoginItem }

function install(vue: typeof Vue) {
  vue.component('Login', Login)
  vue.component('LoginTab', LoginTab)
  Object.keys(LoginItem).forEach(item => {
    vue.component(item, LoginItem[item])
  })
}

export default {
  install: install as PluginFunction<void>
}
