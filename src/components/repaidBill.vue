<template>
  <div class="container">
    <div class="header">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/api/icon_back_white@3x.png" alt>
      </a>
      <span>{{title}}</span>
    </div>
    <div class="content">
      <div class="rpd-top">
        <p>
          <label>已还总额</label>
          <label>待还期数</label>
        </p>
        <p>
          <span>{{amount}} 元</span>
          <span>{{period}} 期</span>
        </p>
      </div>
      <ul class="rpd-list">
        <li v-for="(item,index) in paln" :key="index">
          <p>
            <span class="num">第 {{item.periodNo}} 期</span>
            <span class="status-1">已结清</span>
          </p>
          <p>
            <span  class="money">{{item.paidAmount}} 元</span>
            <span  class="date">{{alltimeFormatter(item.successTime)}}</span>
          </p>
        </li>

         <!-- <li>
          <p>
            <span class="num">第 3 期</span>
            <span class="status-1">已结清</span>
          </p>
          <p>
            <span  class="money">1806.27 元</span>
            <span  class="date">2019-03-18 14:27:02</span>
          </p>
        </li>

        <li>
          <p>
            <span class="num">第 3 期</span>
            <span class="status-1">已结清</span>
          </p>
          <p>
            <span  class="money">1806.27 元</span>
            <span  class="date">2019-03-18 14:27:02</span>
          </p>
        </li> -->

      </ul>

    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import flexible from '../axios/js/flexible.js'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, goBackPage,controlTime} from '@/axios/axios_vue';
import {user_getMyProductList,  autoSign,successOrder} from '@/axios/axios_vue';
import {AndroidOrIos} from '../axios/js/judge.js' 
import util from '../axios/js/util.js';
export default {
    name:'',
    data () {
        return { 
          title:null,
          orderId:null,
          bill:null,

          amount:null,//金额
          period:null,//期数
          paln:[],//已还列表





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

      document.title = "已还账单";  
      this.title = "已还账单";
      this.orderId = this.$route.query.orderId;
      console.log(this.orderId)
      //this.orderId = 16;
      
      this.successOrderRequest();
    },
    methods: {

      //贷款订单详情
      successOrderRequest(){
  //       let newObj = this.testAppData;
  //       newObj.orderId = this.orderId;
 
    
  //       newObj.sign = autoSign(newObj)
  // console.log(newObj);

        var obj = new Object();
        obj.orderId = this.orderId;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj);
        // alert(obj_str)
        sendRequest_app(successOrder, newObj).then((res) => {
          let {code,msg,result} = res;
          // alert(code)
          // alert(msg)
          // let obj_str = JSON.stringify(result)
          // alert(obj_str)
          if(code == "00"){
           
            this.amount = result.amount;
            this.period = result.period;
            this.paln = result.paln;
            
            
            
            
          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error_header'});
          }
        });
      },
      //具体时间格式化
      alltimeFormatter(value){
       if(value == 0 || value.length < 10){return '--';}
        let cellTime =new Date(parseInt(value) * 1000);
        let allTime = util.formatDate.format(cellTime);
        let dateTime = util.formatDate.format(cellTime).split(' ')[0];
        return allTime;
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
  min-height: 100vh;
  background: #FAFAFC;
  background-size: 100% 100%;
  font-family:PingFangSC-Regular;
  font-weight:400;

  padding-top: 2rem;
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



  .content{
    width: 9.2rem;
    margin: 0 auto;
    
    
    box-shadow:0px 3px 6px 0px rgba(221,221,231,1);
    .rpd-top{
      
      background-color: #fff;
      padding: 0.4rem 0;
      padding-bottom: 1.2rem;
      /* border-bottom: 1px solid #DDDDDD; */
      background-size: 102%;
      background-repeat: no-repeat;
      background-image: url(/static/img/pic_k_tou@3x.png);
      background-position: center bottom;
      p{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height:1rem;
        padding:0 0.8rem;
        label{
          font-size: 0.36rem;
          color:#595656;
        }
        span{
          font-weight: 600;
          font-size: 0.6rem;
        }
        span:first-child{
          color:#2CC25D;
        }
        span:last-child{
          color:#595656;
        }
       
      }
    }
    .rpd-list{
       
    
      position: relative;
      top: 0rem;
      left: 0rem;
      background: #fff;
       li:last-child{
        padding-top: 0;
      }
      li:last-child{
        border-bottom: 0;
      }
      li{
        padding:0.4rem ;
        border-bottom:1px dashed #DDD;
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
  
  

}
</style>

