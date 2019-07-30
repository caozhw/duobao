import Vue from 'vue'
import Router from 'vue-router'



import addBank from '@/components/addBank'
import bankList from '@/components/bankList'   
import businessInfo from '@/components/businessInfo' 
import productDetail from '@/components/productDetail' 
import productList from '@/components/productList'
import orderInfo from '@/components/orderInfo' 
import error from '@/components/error' 
import error_header from '@/components/error_header' 
import loanInfo from '@/components/loanInfo' 
import userBankList from "@/components/userBankList";

//分期 currentBill
import repaidBill from '@/components/repaidBill' 
import currentBill from '@/components/currentBill' 


import pinActivity from "@/components/pinActivity";//首页
import treasure from "@/components/treasure";//0元夺宝
import treasureInfo from "@/components/treasureInfo";//0元夺宝 详情
import dryingList from "@/components/dryingList";//0元夺宝 晒单

Vue.use(Router)

export default new Router({
  //去掉地址中的哈希#
  //mode: "history", 
  saveScrollPosition: true ,//记住页面的滚动位置 html5模式适用
  routes: [
    {
      path: '/',
      name: 'pinActivity',
      component: pinActivity,
      meta: {
        title: '赚钱专区'
      }
    },
    {
      path: '/treasure',
      name: 'treasure',
      component: treasure,
      meta: {
        title: '0元夺宝'
      }
    },
    {
      path: '/treasureInfo',
      name: 'treasureInfo',
      component: treasureInfo,
      meta: {
        title: '0元夺宝详情'
      }
    },
    {
      path: '/dryingList',
      name: 'dryingList',
      component: dryingList,
      meta: {
        title: '0元夺宝晒单'
      }
    },








    {
      path: '/error',
      name: 'error',
      component: error,
      meta: {
        title: '页面出错'
      }
    },
    {
      path: '/error_header',
      name: 'error_header',
      component: error_header,
      meta: {
        title: '页面出错'
      }
    },


    {
      path: '/repaidBill',
      name: 'repaidBill',
      component: repaidBill,
      meta: {
        title: '已还账单'
      }
    },
    {
      path: '/currentBill',
      name: 'currentBill',
      component: currentBill,
      meta: {
        title: '本期账单'
      }
    },

    


    {
      path: '/businessInfo',
      name: 'businessInfo',
      component: businessInfo,
      meta: {
        title: '商家详情'
      }
    },
    {
      path: '/loanInfo',
      name: 'loanInfo',
      component: loanInfo,
      meta: {
        title: '借款详情'
      }
    },

    {
      path: '/productList',
      name: 'productList',
      component: productList,
      meta: {
        title: '产品列表'
      }
    },
    {
      path: '/bankList',
      name: 'bankList',
      component: bankList,
      meta: {
        title: '银行卡列表'
      }
    },
    

    {
      path: '/orderInfo',
      name: 'orderInfo',
      component: orderInfo,
      meta: {
        title: '订单详情'
      }
    },

    // {
    //   path: '/businessInfo',
    //   name: 'businessInfo',
    //   component: businessInfo,
    //   meta: {
    //     title: '商家详情'
    //   }
    // },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: productDetail,
      meta: {
        title: '产品详情'
      }
    },
    {
      path: '/addBank',
      name: 'addBank',
      component: addBank,
      meta: {
        title: '添加银行卡'
      }
    },
    {
      path: '/userBankList',
      name: 'userBankList',
      component: userBankList,
      meta: {
        title: '收款银行卡'
      }
    },

  ] 
})
