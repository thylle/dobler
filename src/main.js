// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import config from './config'
import store from './store'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.config.productionTip = false
Vue.http.options.root = config.apiUrl;


//
// Dictionary for multi language - change language by changing the function parameter
import multiLanguage from 'vue-multilanguage'
import {dictionary} from '../dictionary.js'
Vue.use(multiLanguage, dictionary("da"))

//
// Moment.js
const moment = require('moment')
require('moment/locale/da')
Vue.use(require('vue-moment'), {moment})

//
// Progress bar
const progressOptions = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.3s',
    opacity: '0.6s',
    termination: 300
  }
}
Vue.use(require('vue-progressbar'), progressOptions)



// Init the app
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<app/>',
  components: { App }
})
