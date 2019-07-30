<template>
  <div class="container">
    <ul>
      <li>
        <label>借款金额</label>
        <span style="color:#FF9530">1500.00 元</span>
      </li>
      <li>
        <label>借款期限</label>
        <span>28 天<em>（ 7天*4期 ）</em></span>
      </li>
      <li>
        <label>借款利息</label>
        <span>19.00 元</span>
      </li>
       <li style="margin-bottom:0.32rem;border:0">
        <label>服务费用</label>
        <span>209.00 元</span>
      </li>
       <li >
        <label>到账金额</label>
        <span>19.00 元</span>
      </li>
       <li style="margin-bottom:0.32rem;border:0">
        <label>到账银行</label>
        <span>招商银行<em>（9090）</em></span>
      </li>
       <li>
        <label>到期应还</label>
        <span>1500.00 元</span>
      </li>
       <li>
        <label>还款计划</label>
        <span class="arrow">首期还款日<em> 2019-02-27</em><i></i></span>
      </li>
    </ul>
    <div class="protocol">
      <i></i>
      <span>我已阅读并同意 <a href="#">《借款协议》</a><a href="#">《平台服务协议》</a><a href="#">《扣款协议》</a></span>
    </div>
    <!-- 按钮 -->
    <div class="btn" >
      <span>确认借款</span>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
import flexible from '../axios/js/flexible.js'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, goBackPage,controlTime} from '@/axios/axios_vue';
import {autoSign,getProductBankList} from '@/axios/axios_vue';
import {AndroidOrIos} from '../axios/js/judge.js' 
export default {
    name:'',
    data () {
        return { 
        

          productId:188,
        }
    },
    computed:{

      
    },
    mounted() {
     
    },
    methods: {
     
      //提示框
      toastShowHide(msg,pos,time){
         Toast({
          message: msg,
          position: pos,
          duration: time,
          className:'.j-toast'
        });
      },
   
    }
};
</script>
<style lang="scss" scoped>
.container {
  width: 10rem;
  height: 100vh;
  background: #FAFAFC;
  background-size: 100% 100%;
  font-family:PingFangSC-Regular;
  font-weight:400;

  ul{
   
    li{
       padding:0 0.4rem;
      background: #FFF;
      font-family:PingFangSC-Regular;
      font-weight:400;
      font-size:0.42rem;
      height: 1.4rem;
      line-height: 1.4rem;
      border-bottom: 1px solid #EDECED;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      label{
        color:#84878A;
      }
      span{
        color:#2D2A31;

        em{
          color:#84878A;
        }
       
      }
      .arrow{
         display: inline-block;
          padding-right: 0.6rem;
          background-position: right center;
          background-size: 10%;
          background-repeat: no-repeat;
          background-image: url(../assets/images/api/icon_jr@3x.png); 
       }
     
    }
  }
  .protocol{
    height: 1.6rem;
    margin-top:0.8rem;
    padding:0 0.4rem;
    i{
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      margin-right: 0.16rem;
      vertical-align: middle;
      background-size: 100%;
      background-repeat: no-repeat;
      background-image: url(../assets/images/api/pic_gou@3x.png); 
    }
    span{
      vertical-align: middle;
      color:#1D1B1B;
      font-size: 0.32rem;
      a{
        color:#D8A154;  
      }
    }
  }
  .btn{
    width: 10rem;
    height: 1.4rem;
    margin-top: 2rem;
    color:#5C341C;
    font-size: 0.52rem;
    font-weight: 500;
    text-align: center;
    line-height: 1.4rem;

    display: flex;
    flex-direction: row;

   
    span{
      flex:3;
      width: 100%;
      height: 100%;
      display: inline-block;
      background:linear-gradient(90deg,rgba(242,214,164,1) 0%,rgba(215,160,83,1) 100%);
    }
    .concel-btn{
      flex:1;
      background: #FAFAFC;
      color:#84878A;
      border-top:1px solid #DDD;
    }
    .dis-span{
      background:linear-gradient(90deg,#f1e4d0 0%,#e3c9a8 100%);
      color:#ac8f73;
    }
  }
}
</style>

