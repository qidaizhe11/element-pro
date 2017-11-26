// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap-reboot.css'
import './theme/element-theme.scss'
import './assets/anticon/iconfont.css'
import './main.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
/* tslint:disable no-unused-expression */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
