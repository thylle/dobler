// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router.js'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.config.productionTip = false

//
// Dictionary for multi language - change language by changing the function parameter
import MultiLanguage from 'vue-multilanguage'
import {dictionary} from '../dictionary.js'
Vue.use(MultiLanguage, dictionary("da"))

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
  router,
  template: '<app/>',
  components: { App }
})
