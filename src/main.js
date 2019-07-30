
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import Vue from 'vue'
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

// import layer from 'vue2-layer-mobile'//此插件有毒
// Vue.use(layer)



import axios from 'axios' //引入axios
Vue.prototype.$ajax=axios //修改Vue的原型属性
Vue.config.productionTip = false

Vue.use(require('vue-wechat-title'))//每个页面设置标题
import store from './store/store.js';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
