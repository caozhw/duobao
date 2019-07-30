<template>
  <div class="container">
    <div class="header" v-if="orderId!=0">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/api/icon_back_white@3x.png" alt>
      </a>
      <span>{{title}}</span>
    </div>
    <div class="info">
      以下为您在本平台已绑定的收款银行卡
    </div>
    <div class="list">
       <ul>
        <!-- <li >
          <img src="#" />
          <span>432 <strong>尾号009</strong></span>
          <em ></em>
        </li>
        <li >
          <img src="#" />
          <span>432 <strong>尾号009</strong></span>
          <em class="active"></em>
        </li> -->
        <li v-for="(bank,index) in bankList" @click="handleSelectBankClick(bank)" :key="index">
          <img :src="bank.bankUrl" />
          <span>{{bank.bankName}} <strong>尾号{{bank.cardNo}}</strong></span>
          <em :class="selectedBank.bankCode == bank.bankCode?'active':''" ></em>
        </li> 
        
      </ul>

       
    </div>
    <div class="btn" @click="handleAddBankClick">添加银行卡</div>


  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, openAppNewPage,openAppNewPageWithToolBar, saveUserEvent,goBackPage} from '@/axios/axios_vue';
import {autoSign,userBankList} from '@/axios/axios_vue';
import Prompt from '@/eles/Prompt'
export default {
    name:'',
    components: {
      Prompt
    },
    data () {
        return { 

          isPrompt:0,//0 不显示 1淡入 -1淡出
          promptText:'',//提示框文字

          
         selectedBank:{},
          bankList:[],

          productId:188,//产品id 改
          orderId:0,
          //测设用 app 申请数据
          // testAppData:{
          //   appKey:"android_user",
          //   uuid:"3072562a-69d5-490c-939e-fc0a562787f8",
          //   sessionId:"a34056eea8741ea56fe0c884bcabb717",
          //   source:"JxhOfficial",
          // },

          
         
          
        }
    },
    computed:{

      ...mapState(['bank'])
    },
   
    mounted() {
      document.title = "收款银行卡";  
      this.title = "收款银行卡";

     
      //获取产品id
      console.log(this.bank)
      this.productId =  this.bank.saveProductId;
      this.orderId =  this.bank.saveOrderId?this.bank.saveOrderId:0;


      this.selectedBank =  this.bank.selectedBankStore ? this.bank.selectedBankStore : {bankCode:null,bankName:null};
      this.getUserBankListRequest();
    },
    methods: { 
       //获取我的银行卡列表(H5)
      getUserBankListRequest(){
        // //测试数据
        // let newObj = this.testAppData;
        // newObj.productId = this.productId;
        // newObj.productOrderId = this.orderId;
        // newObj.sign = autoSign(newObj)

        //调用
        var obj = new Object();
        obj.productId = this.productId;
         obj.productOrderId = this.orderId;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
        //alert(obj_str)
        sendRequest_app(userBankList, newObj).then((res) => {
          let {code,msg,result} = res;
           //alert(code)
          // alert(msg)
           let obj_str = JSON.stringify(res)
        //alert(obj_str)
          if(code == "00"){
            this.bankList = result.bankList;
            this.$store.dispatch('saveNameAction',result.name);
            if(this.bankList.length==0){
              this.$store.dispatch('selectedBankAction',{});
              this.$router.push({path:'/addBank'});
            }
           
          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error'});
          }
        });
      },

      //收款银行卡 点击
      handleAddBankClick(){
        this.$store.dispatch('selectedBankAction',{});
        this.$router.push({path:'/addBank'});

      },

      //选择银行卡
      //选择银行卡
      handleSelectBankClick(bank){
        this.selectedBank = bank;
        this.$store.dispatch('selectedBankAction',bank);
        this.$router.push({path:'/addBank'});
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
  min-height: 100vh;
  position: relative;
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
  .info{
    height: 1.2rem;
    color:#FF9530;
    background-color:rgba(255,149,48,0.1);
    font-size: 0.42rem;
    line-height: 1.2rem;
    padding-left: 0.4rem;
  }
  .list{
    width: 10rem;
    color:#84878A;
    font-size: 0.44rem;
   
    
    ul{
    padding-left:0.6rem;
     padding-right:0.6rem;
      li{
       
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
          strong{
            color:#84878A;
            font-weight: 400;
          }
        }
        em{
          display: inline-block;
          width: 0.68rem;
          height: 0.68rem;
          background-image: url(../assets/images/api/icon_skyhk_wxz@3x.png);
          background-size:100%;
          background-repeat: no-repeat;
          vertical-align: middle;
          float: right;
          position: relative;
          top:0.68rem;
        }
        em.active{
           background-image: url(../assets/images/api/icon_skyhk_xz@3x.png);
        }
      }
    }
  }
  .btn{
    width: 10rem;
    height: 1.4rem;
    background:linear-gradient(90deg,rgba(242,214,164,1) 0%,rgba(215,160,83,1) 100%);
    color:#5C341C;
    font-size: 0.56rem;
    text-align: center;
    line-height: 1.4rem;
    position: absolute;
    bottom: 0;
  }


  





  input-placeholder{color:#84878A;}
  ::-webkit-input-placeholder{color:#84878A;}    /* 使用webkit内核的浏览器 */
  :-moz-placeholder{color:#84878A;}                  /* Firefox版本4-18 */
  ::-moz-placeholder{color:#84878A;}                  /* Firefox版本19+ */
  :-ms-input-placeholder{color:#84878A;}           /* IE浏览器 */
}
</style>

