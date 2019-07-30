<template>
  <div class="container">
    <div class="procedure">
      <div class="title">
        <i></i>
        <span>贷款流程</span>
      </div>
      <ul class="pd-list">
        <li>提交申请</li>
        <li>机构审批</li>
        <li>确认贷款</li>
        <li>机构放款</li>
      </ul>
      <div class="pd-img"></div>
    </div>
    <div class="cost-description">
      <div class="title" style="margin-bottom: 0.8rem;">
         <i></i>
        <span>费用说明</span>
      </div>


       <div class="cd-item" v-for="item in feeInfo">
        <p>
          <label>{{item.title}}</label>
          <span v-html="item.text"></span>
        </p>
      </div>
 
      <!-- <div class="cd-item">
        <p>
          <label>日费率：</label>
          <span>{{productDetail.dayMinRatio}}% ~ {{productDetail.dayMaxRatio}}%</span>
        </p>
      </div> -->

     <!-- <div class="cd-item">
        <p>
          <label>举<em></em>例：</label>
          <span>{{productDetail.feeInfo}}</span>
        </p>
         <p>
          <label></label>
          <span> 借款期限7天</span>
        </p>
        <p>
          <label></label>
          <span>审批确认后到账750元，到期还款1000元</span>
        </p>
      </div> -->

    </div>
    <div class="repayment">
      <div class="title">
         <i></i>
        <span>还款说明</span>
      </div>
       <div class="rp-item" v-for="item in refundDesc">
        <h5>{{item.title}}</h5>
        <p>{{item.text}}</p>  
      </div>
      <!-- <div class="rp-item">
        <h5>还款方式：</h5>
        <p>{{productDetail.refundType}}</p>
      </div>
       <div class="rp-item">
        <h5>提前还款：</h5>
        <p>{{productDetail.forwardRefund}}</p>
      </div>
       <div class="rp-item">
        <h5>逾期还款：</h5>
        <p>{{productDetail.overdueRefund}}</p>
      </div> -->
    </div>
    
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import flexible from '../axios/js/flexible.js'
import { mapState } from 'vuex'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, goBackPage,controlTime} from '@/axios/axios_vue';
import {user_getMyProductList,autoSign,  getProductDetail} from '@/axios/axios_vue';
import {AndroidOrIos} from '../axios/js/judge.js' 
export default {
    name:'',
    data () {
        return { 


          productDetail:{},
          feeInfo:{},//费用说明
          refundDesc:{},//还款说明
          // dayMinRatio:null,
          // dayMaxRatio:null,
          // minTime:null,
          // maxTime:null,
          // feeInfo:null,
          // refundType:null,
          // forwardRefund:null,
          // overdueRefund:null,

          
          productId:188,//产品id 改

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
      // selectedBank() {
      //   return this.$store.state.bank.selectedBankStore;
      // }
      ...mapState(['bank'])
    },
    mounted() {
      document.title = "产品详情";
      //获取产品id
      //alert(this.bank.saveProductId)
      this.productId =  this.bank.saveProductId;
      this.getProductDetailRequest();
    },
    methods: {
      //获取产品详细信息
      getProductDetailRequest(){
        // let newObj = this.testAppData;
        // newObj.productId = this.productId;
 
        // console.log(newObj);
        // newObj.sign = autoSign(newObj)


        var obj = new Object();
        obj.productId = this.productId;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
        //alert(obj_str)
        sendRequest_app(getProductDetail, newObj).then((res) => {
          let {code,msg,result} = res;
           //alert(code)
           //alert(msg)
          if(code == "00"){
            document.title = result.title;
            this.productDetail = result;

            this.feeInfo = result.feeInfo;
            this.refundDesc = result.refundDesc;

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
  .title{
    border-bottom:1px solid #DDDDDD;
    background:#FFF;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: 0.4rem;
    color:#1D1B1B;
    padding-left:0.4rem;
    margin-top:0.4rem;
    i{
      display: inline-block;
      vertical-align: middle;
      width: 0.12rem;
      height: 0.48rem;
      margin-right:0.12rem;
      background-size: 100%;
      background-repeat: no-repeat;
      background-image: url(../assets/images/api/pic_cpxq_tiao@3x.png); 
    }
    span{
      vertical-align: middle;
    }
    
  }
  .procedure{
    background: #FFF;
    padding-bottom: 0.6rem;
    
    .pd-list{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding-top: 0.68rem;
     
      li{
        flex:1;
        color:#84878A;
        font-size: 0.38rem;
        text-align: center;
      }
    }
    .pd-img{
     
      height: 1rem;
      margin: 0 1rem;
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
      background-image: url(../assets/images/api/pic_cpxq_dklc@3x.png); 
    }
  }

  .cost-description{
    color:#84878A;
    font-size:0.39rem;
    background:#FFF;
    padding-bottom:0.48rem;
    .cd-item{
      margin-top:0.48rem;
      padding-left:0.4rem;
      p{
        line-height: 0.6rem;
        display: flex;
        flex-direction: row;
        label{
          display: inline-block;
          width: 2.4rem;
          text-align: right;
          em{
            display: inline-block;
            width: 0.39rem;
          }
        }
      }
      
    }
  }
  .repayment{
    color:#84878A;
    font-size:0.39rem;
    background:#FFF;
    padding-bottom:0.48rem;
    .rp-item{
      margin-top:0.38rem;
      padding-left:0.4rem;
      h5{
        color:#1D1B1B;
      }
      p{
        color:#84878A;
        line-height: 0.6rem;
      }
      
    }
  }
  
  



}
</style>

