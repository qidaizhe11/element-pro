import Vue, { PluginFunction } from 'vue'
import Login from './Login.vue'
import LoginItem from './LoginItem'

export { Login, LoginItem }

function install(vue: typeof Vue) {
  vue.component('Login', Login)
  // Object.keys(LoginItem).forEach(item => {
  //   vue.component(item, LoginItem[item])
  // })
}

export default {
  install: install as PluginFunction<void>
}
