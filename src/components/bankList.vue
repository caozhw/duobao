<template>
  <div class="container">
     <div class="header" v-if="orderId!=0">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/api/icon_back_white@3x.png" alt>
      </a>
      <span>银行列表</span>
    </div>
    <ul>
      <li v-for="bank in bankList" @click="handleSelectBankClick(bank)">
        <img :src="bank.bankUrl" />
        <span>{{bank.bankName}}</span>
        <em v-if="selectedBank.bankCode == bank.bankCode"></em>
      </li>
      
    </ul>
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
          bankList:null,
          selectedBank:null,

          productId:188,
          productOrderId:null,//订单号 : 前置绑卡为空,后置绑卡,换卡：当前订单的id

          testAppData:{
            appKey:"android_user",
            uuid:"3072562a-69d5-490c-939e-fc0a562787f8",
            sessionId:"a34056eea8741ea56fe0c884bcabb717",
            source:"JxhOfficial",
          },

          orderId:0,//订单id
        }
    },
    computed:{

      ...mapState(['bank'])
    },
    mounted() {
      document.title = "选择银行";  
      //获取产品id
      //alert(this.bank.saveProductId)
      this.productId =  this.bank.saveProductId;
      this.orderId =  this.bank.orderId;
      
      this.productOrderId = this.orderId?this.orderId:0;
      console.log(this.productOrderId)
      this.getProductBankListRequest();
      this.selectedBank =  this.bank.selectedBankStore ? this.bank.selectedBankStore : {bankCode:null,bankName:null};
    },
    methods: {
      //选择银行卡
      handleSelectBankClick(bank){
        this.selectedBank = bank;
        this.$store.dispatch('selectedBankAction',bank);
        this.$router.push({path:'/addBank'});
      },
      //获取银行卡列表请求
      getProductBankListRequest(){
        // //测试数据
        // let newObj = this.testAppData;
        // newObj.productId = this.productId;
        // newObj.productOrderId = this.productOrderId;
        // newObj.sign = autoSign(newObj)

        //调用
        var obj = new Object();
        obj.productId = this.productId;
        obj.productOrderId = this.productOrderId;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
        //alert(obj_str)
        sendRequest_app(getProductBankList, newObj).then((res) => {
          let {code,msg,result} = res;
           //alert(code)
          // alert(msg)
          if(code == "00"){
            this.bankList = result.bankList;
            let obj_str = JSON.stringify(result)
        //alert(obj_str)
          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error'});
          }
        });
      },
      //提示框
      toastShowHide(msg,pos,time){
         Toast({
          message: msg,
          position: pos,
          duration: time,
          className:'.j-toast'
        });
      },
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
  background: #fff;
  background-size: 100% 100%;
  font-family:PingFangSC-Regular;
  font-weight:400;
  .header {
   
    width: 10rem;
    height: 1.24rem;
    line-height: 1.24rem;
    position: fixed;
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

  ul{
    margin-top:1.32rem;
    padding-left:0.6rem;
    li{
      padding-right:0.6rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      font-size:0.42rem;
      height: 2rem;
      line-height: 2rem;
      color:#1D1B1B;
      border-bottom: 1px solid #DDDDDD;
      img{
        display: inline-block;
        vertical-align: middle;
        width: 1rem;
        height: 1rem;
      }
      span{
        display: inline-block;
        padding-left:0.2rem;
        vertical-align: middle;
      }
      em{
        display: inline-block;
        width: 0.68rem;
        height: 0.68rem;
        background-image: url(../assets/images/api/icon_xzyh_xz@3x.png);
        background-size:100%;
        background-repeat: no-repeat;
        vertical-align: middle;
        float: right;
        position: relative;
        top:0.68rem;
      }
    }
  }
}
</style>

