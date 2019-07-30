<template>
  <div class="container">
     <div class="header">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/api/icon_back_white@3x.png" alt>
      </a>
      <span>{{title}}</span>
    </div>
    <div class="no-record" v-if="isShowNoRecord">
      <i></i>
      <p>您访问的信息有误，请重新再试...</p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import flexible from '../axios/js/flexible.js'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, goBackPage,controlTime} from '@/axios/axios_vue';
import {autoSign,getMyOrderList} from '@/axios/axios_vue';
import {AndroidOrIos} from '../axios/js/judge.js' 
import util from '../axios/js/util.js';
export default {
    name:'',
    data () {
        return { 
          title:'访问错误',
          isShowNoRecord:true,

         
          
        }
    },
    computed:{

      
    },
    mounted() {
     
    
    },
    methods: {

     
       //返回上一级
      goBack(){
        goBackPage();
      },

   
    }
};
</script>
<style lang="scss" scoped>
.container {
  width: 10rem;
  background: #FAFAFC;
  background-size: 100% 100%;
  font-family:PingFangSC-Regular;
  font-weight:400;
  .header {
    width: 10rem;
    height: 1.24rem;
    line-height: 1.24rem;
    position: absolute;
    top:0;
    background: #fff;
    text-align: center;
    border-bottom: 2px solid #FAFAFC;
    img {
      width: 0.28rem;
      height: 0.5rem;
      margin-top: 0.45rem;
      position: absolute;
      left: 0.4rem;
    }
    span {
      margin: 0 auto;
      display: inline-block;
      font-weight: bold;
      color: #1d1b1b;
      font-size:0.48rem;
      vertical-align: middle;
    }
  }
  .no-record{
    margin:0 auto;
     margin-top:4.5rem;
    background: #FFF;
    text-align: center;
    i{
      width: 3.2rem;
      height: 3.6rem;
      display: inline-block;
      background-image: url(../assets/images/api/pic_wddd_zwdd@3x.png);
      background-size:100%;
       background-repeat: no-repeat;
    }
    p{
      font-size: 0.36rem;
      color:#84878A;
    }
  }
  ul{
    margin-top:1.5rem;
    background: #FAFAFC;
    li{
      background: #FFF;
      
      margin-bottom:0.2rem;
      .name{
        height: 1.4rem;
        line-height: 1.4rem;
        padding:0 0.4rem;
        display: flex;
        flex-direction: row;
        border-bottom:1px solid #DDDDDD;
        p{
          flex:1;
        }
        p:nth-of-type(1){
          text-align: left;
          img{
            width: 0.68rem;
            vertical-align: middle;
            margin-right: 0.1rem;
          }
          span{
            font-size:0.44rem;
            color:#1D1B1B;
            vertical-align: middle;
          }
        }
        p:nth-of-type(2){
          text-align: right;
          font-size:0.36rem;
          color:#84878A;
        }
      }
      .list{
        height: 1.6rem;

        padding:0 0.4rem;
        padding-bottom: 0.4rem;
        display: flex;
        flex-direction: row;
        .list-item{
          flex:1;
          padding: 0.2rem 0;
          span{
            display: block;
            font-size:0.44rem;
            color:#1D1B1B;
            vertical-align: middle;
            line-height: 0.8rem;
          }
          label{
            display: block;
            font-size:0.36rem;
            color:#84878A;
          }
         
        }
        .list-item:nth-of-type(4){
          flex:0.8;
          line-height: 1.4rem;
          p{
            display: inline-block;
            width: 2rem;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            font-size:0.38rem; 
          }
          .status-orange{
            border:1px solid #FF9530;
            color:#FF9530;
          }
          .status-green{
            border:1px solid #2CC25D;
            color:#2CC25D;
          }
          .status-red{
            border:1px solid #FF5337;
            color:#FF5337;
          }
          .status-black{
            border:1px solid #84878A;
            color:#84878A;
          }
        }
      }
    }
  }

}
</style>

