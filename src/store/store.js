import Vue from 'vue';
import Vuex from 'vuex';

import bankModule from "../modules/bankModule";
Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {

    bank: bankModule,

  },
  state: {
    //存储数据


  },
  getters: {
    //获取属性的状态
  },
  mutations: {
    //改变属性的状态
   
  },
  actions: {
    //应用mutations
  }
})
export default store
