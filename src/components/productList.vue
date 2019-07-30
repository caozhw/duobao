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
      <p>目前还没有记录</p>
    </div>
    <ul v-if="!isShowNoRecord">
      <li v-for="(item,index) in productList" :key="index" @click="handleProductClick(item.productId)">
        <div class="name">
          <p>
            <img :src="item.imageUrl" />
            <span>{{item.title}}</span>
          </p>
          <p>{{timeFormatter(item.applyTime)}}</p>
        </div>
        <div class="list">
          <div class="list-item">
            <span>{{parseInt(item.applyAmount)}} 元</span>
            <label>金额</label>
          </div>
          <div class="list-item">
            <span>{{item.applyTerm}} 期</span>
            <label>期限</label>
          </div>
          <div class="list-item">
            <span>{{item.rates}} %</span>
            <label>月利率</label>
          </div>
          <div class="list-item">
            <p :class="orderStatusClass(item.status)">{{orderStatusFormatter(item.status)}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
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
          title:null,
          type:null,//订单状态  	待完成:pendingComplete 待还款:pendingRefund 完成 :completed

          productList:null,

          //订单状态
          orderStatus:[
            {value:2,label:'资质审核'},//审批中(已经申请借款) o
            {value:3,label:'审批已拒绝'},//审批失败 r
            {value:4,label:'借款确认'},//等待确认借款(审批成功,等待确认) o
            {value:5,label:'已取消'},//取消借款 b
            {value:6,label:'借款审批'},//打款中(已经确认借款)  g
            {value:7,label:'我要还款'},//打款成功(可以还款了) o
            {value:8,label:'已逾期'},//已经逾期 r
            {value:9,label:'已结清'},//已还款 o
            {value:10,label:'打款失败'}, //////打款失败 r
            {value:11,label:'我要还款'}, //////还款中 g

            {value:12,label:'未通过'}, //////确认借款失败
            {value:13,label:'待开户'}, //////待开户
            {value:14,label:'待提现'}, //////待提现
            {value:15,label:'还款失败'}, //////还款失败
            {value:16,label:'审批未通过'}, //////推送失败 r
            {value:1,label:'资质审核'}, //////待推送 o
            {value:17,label:'绑卡收款'}, //////待绑卡 r
            
           
            
          ],
          isShowNoRecord:false,

         //测设用 app 申请数据
          testAppData:{
            appKey:"android_user",
            uuid:"76c29904-f4f7-46fa-822e-a93092e6a5db",
            sessionId:"ed72fb01e3bd8f3219d7340853e089a1",
            source:"JxhOfficial",
          },
          
        }
    },
    computed:{

      
    },
    mounted() {
      document.title = "产品列表"; 
      //待完成:pendingComplete 待还款:pendingRefund 完成 :completed
       //获取连接地址的type
      this.type = util.GetUrlParam('type'); 
      //alert( this.type)
      if(this.type == 'pendingComplete'){
        this.title = '待完成';
      }
      else if(this.type == 'pendingRefund'){
        this.title = '待还款';
      }
      else if(this.type == 'completed'){
        this.title = '已完成';
      }
      document.title = this.type; 
      this. getMyOrderListRequest();
     
    },
    methods: {

      //获取我的贷款订单列表
      getMyOrderListRequest(){
      //   let newObj = this.testAppData;
      //   newObj.type = this.type;
 
      // //console.log(newObj);
      //   newObj.sign = autoSign(newObj)


        var obj = new Object();
        obj.type = this.type;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj);
        //alert(obj_str)
        sendRequest_app(getMyOrderList, newObj).then((res) => {
          let {code,msg,result} = res;
          let obj_str = JSON.stringify(res);
          //alert(obj_str)
          if(code == "00"){
            this.productList = result.orderList;
            let obj_str = JSON.stringify(result);
            this.isShowNoRecord = this.productList.length>0 ? false : true;

          }else{
             this.toastShowHide(msg,'bottom',2000);
            this.$router.push({path:'/error_header'});
          }
        });
      },
      //产品订单 点击
      handleProductClick(id){
        this.$router.push({path:'orderInfo',query:{orderId:id}})
      },
      //时间格式化
      timeFormatter(value){
       if(value == 0 || value.length < 10){return '--';}                       
        let cellTime =new Date(parseInt(value) * 1000);
        let allTime = util.formatDate.format(cellTime);
        let dateTime = util.formatDate.format(cellTime).split(' ')[0];
        return dateTime;
      },
      //订单状态 格式
      orderStatusFormatter(value){
        for(let item of this.orderStatus){
          if(item.value == value){
            return item.label;
          }
        }
      },
      //订单状态 样式
      orderStatusClass(value){
        let _orange = value == 2 || value == 4 || value == 7 || value == 9 || value == 13 || value == 14 || value == 1;
        let _green = value == 6 || value == 11;
        let _red = value == 3 || value == 8 || value == 10 || value == 12 || value == 15 || value == 16;
        let _black = value == 5; 

        if(_orange){
          return 'status-orange';
        }
        if(_green){
          return 'status-green';
        }
        if(_red){
          return 'status-red';
        }
        if(_black){
          return 'status-black';
        }
      },
       //返回上一级
      goBack(){
        goBackPage();
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
           overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
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

