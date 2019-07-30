<template>
  <div class="container">
    <div class="header">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/api/icon_back_white@3x.png" alt>
      </a>
      <span>{{title}}</span>
    </div>

    <div class="cur-top">
      <p>
        <span>已还总额</span>
        <span>剩余期数</span>
      </p>
      <p>
        <span>2000 元</span>
        <span>3 期</span>
      </p>
    </div>
    <ul class="cur-list">

    </ul>

 
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import flexible from '../axios/js/flexible.js'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, goBackPage,controlTime} from '@/axios/axios_vue';
import {user_getMyProductList,  autoSign,getMyOrderDetail} from '@/axios/axios_vue';
import {AndroidOrIos} from '../axios/js/judge.js' 
import util from '../axios/js/util.js';
export default {
    name:'',
    data () {
        return { 
          title:null,
          orderId:null,
          bill:null,





          //测设用 app 申请数据
          testAppData:{
            appKey:"android_user",
            uuid:"3072562a-69d5-490c-939e-fc0a562787f8",
            sessionId:"a34056eea8741ea56fe0c884bcabb717",
            source:"JxhOfficial",
          },
        }
    },
    mounted() {

      document.title = "本期账单";  
      this.title = "本期账单";
      this.bill = this.$route.params.bill;
      console.log(this.$router)
      //this.orderId = 16;
      
      //this.getMyOrderDetailRequest();
    },
    methods: {

      //贷款订单详情
      getMyOrderDetailRequest(){
        let newObj = this.testAppData;
        newObj.orderId = this.orderId;
 
      //console.log(newObj);
        newObj.sign = autoSign(newObj)


        // var obj = new Object();
        // obj.orderId = this.orderId;
        // var appReturnStr = getSignParamFromApp(obj);
        // let newObj = JSON.parse(appReturnStr);
        // let obj_str = JSON.stringify(newObj);
        // alert(obj_str)
        sendRequest_app(getMyOrderDetail, newObj).then((res) => {
          let {code,msg,result} = res;
          // alert(code)
          // alert(msg)
          // let obj_str = JSON.stringify(result)
          // alert(obj_str)
          if(code == "00"){
           
            
            
            
            
            
          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error_header'});
          }
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






    .cur-list{
      width: 8.9rem;
      position: relative;
      top: -0.12rem;
      left: 0.06rem;
      background: #fff;
      box-shadow:0px 3px 6px 0px rgba(221,221,231,1);
      li:last-child{
        border-bottom: 0;
      }
      li{
        padding:0.4rem ;
        border-bottom: 1px dashed #DDDDDD;
        p{
          height: 0.8rem;
          line-height: 0.64rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-size: 0.42rem;
          span{
            font-size: 0.36rem;
          }
          .num{
            color:#595656;
          }
          .status-1{
            color:#C7C7C7;
          }
          .status-2{
            display: inline-block;
            width: 2.2rem;
            height: 0.8rem;
            background: #FF9530;
            color: #FFFFFF;
            text-align: center;
            line-height: 0.8rem;
            border-radius: 1rem;
          }
          .status-3{
            display: inline-block;
            width:2.2rem;
            height: 0.8rem;
            background: #FF5337;
            color: #FFFFFF;
            text-align: center;
            line-height: 0.8rem;
            border-radius: 1rem;
          }
          .status-4{
            display: inline-block;
            width: 2.2rem;
            height: 0.8rem;
            background: #FF9530;
            color: #FFFFFF;
            text-align: center;
            line-height: 0.8rem;
            border-radius: 1rem;
            opacity:0.5;
          }
          .money{
            font-size: 0.44rem;
            color:#FF9530;
          }
          .date{
            font-size: 0.36rem;
            color:#84878A;
          }

        }
        .wait-overdue{
          background: rgba(255,83,55,.1);
          color:#FF5337;
           justify-content: space-around;
        }
      }
    }
  
  

}
</style>

