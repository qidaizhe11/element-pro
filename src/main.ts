// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import ElementUI from 'element-ui'
import 'moment/locale/zh-cn'

import App from './App.vue'
import router from './router'
import store from './store'

import './router/authority'

import 'bootstrap/dist/css/bootstrap-reboot.css'
import './theme/element-theme.scss'
import './theme/anticon.scss'
import './main.scss'

Vue.config.productionTip = false

// Vue.use(ElementUI)

/* eslint-disable no-new */
/* tslint:disable no-unused-expression */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
