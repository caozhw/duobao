<template>
  <div class="container">
    <div class="header" v-if="orderId!=0">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/api/icon_back_white@3x.png" alt>
      </a>
      <span>{{title}}</span>
    </div>
    <div class="info">
      该银行卡用于还款及收款，仅支持借记卡。
    </div>
     <div class="list">
       <div class="list-item">
         <label>持卡人</label>
         <span>{{form.name}}</span>
         
       </div>

        <div class="list-item">
         <!-- <em v-if="form.bankName"></em> -->
         <img :src="showBank.bankUrl" v-if="form.bankName"/>
         <label  style="color:#1D1B1B" v-if="form.bankName">{{showBank.bankName}}</label>
         <label  style="color:#84878A" v-if="!form.bankName">选择银行</label>
         <!-- <label :style="form.bankName?'color:#1D1B1B':'color:#84878A'"></label> -->
         <span  @click="handleSelectBankClick()">请选择</span>
         <i class="arrow"></i>
       </div>

        <div class="list-item">
         <input type="text" v-model="form.bankCardNo" placeholder="银行卡号" />
       </div>

        <div class="list-item">
          <input type="text" v-model="form.cardPhone" placeholder="银行预留手机号" />
          <!-- <i class="qs-mark" @click="handleShowTipClick"></i> -->
       </div>

        <!-- <div class="list-item">
         <input type="text" v-model="vcode" placeholder="验证码" />
          <span class="code" v-if="sendCodeSuccess">{{sendCodeNum}}</span>
         <span class="code" v-if="!sendCodeSuccess" @click="handleSendCodeClick()">获取验证码</span>
        
       </div> -->
    </div>
    <div class="btn" @click="handleAddBankClick">确定</div>

    <!-- 银行预留手机号弹框 -->
    <div class="alert-msg" v-if="isShowPreMobileTip">
      <div class="alert-content ">
        <h4>什么是银行预留手机号？</h4>
        <p>添加银行卡需校验您的身份信息，若手机验证码获取失败，请留意您的注册手机号是否为您当前需绑定的银行卡所关联的银行预留手机号。</p>
        <div>
          <span class='concel-btn' @click="handleCustomServiceClick">我有疑问</span>
          <span class='right-btn'  @click="handleHideTipClick">我知道了</span>
        </div>
      </div>
    </div>
    <!-- 银行卡添加中弹框 -->
    <div class="alert-msg" v-if="isShowAdding">
      <div class="alert-content load-content">
       <i class="loading-icon"></i>
       <p class="loading-p">银行卡添加中…</p>
      </div>
    </div>
    <!-- 银行卡添加成功弹框 -->
    <div class="alert-msg" v-if="isShowAddSuccess">
      <div class="alert-content success-content">
       
       <p class="success-p"><i class="success-icon"></i>银行卡添加成功</p>
      </div>
    </div>
    <!-- 银行卡添加失败弹框 -->
    <div class="alert-msg" v-if="isShowAddFail">
      <div class="alert-content fail-content">
       <h4>温馨提示</h4>
       <p>银行卡添加失败</p>
       <div>
         <span @click="handleCustomServiceClick">联系客服</span>
         <span @click="handleReAddClick">重新添加</span>
       </div>
      
      </div>
    </div>

    <!-- 添加银行卡验证码 弹框 -->
    <div class="alert-msg"  v-if="isShowSendCodeAlert">
      <div class="alert-content fail-content send-content">
        <h4>短信验证码</h4>
        <p><span>验证码将发送至</span><span>{{mobileFormatter(form.cardPhone)}}</span></p>
        <p class="ipt-p">
          <input v-model="vcode" placeholder="请输入短信验证码" />
          <em  v-if="sendCodeSuccess">{{sendCodeNum}}</em>
          <!-- <em @click="handleSendCodeClick" v-if="!sendCodeSuccess">获取</em> -->
        </p>
         <!-- <p class="no-code"><span @click="handleCanotReceiveCodeClick">收不到验证码 ？</span></p> -->
        <div>
          <span class='concel-btn' @click="handleCloseSendCodeAlertClick">取消</span>
          <span class='right-btn'  @click="handleSureRepayClick">确认</span>
        </div>
      </div>
    </div>


    <!-- 提示框 -->
    <Prompt  v-show="isPrompt" :isPrompt='isPrompt' :promptText='promptText' ></Prompt>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, openAppNewPage,openAppNewPageWithToolBar, goBackPage, saveUserEvent} from '@/axios/axios_vue';
import {autoSign,createOrderByProduct,addBank} from '@/axios/axios_vue';
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

          isShowPreMobileTip:false,//银行预留手机号弹框
          isShowAdding:false,//银行卡添加中
          isShowAddSuccess:false,//添加成功
          isShowAddFail:false,//添加失败

          isShowSendCodeAlert:false,
         
          showBank:{},

          sendCodeSuccess:false,
          sendCodeNum:null,
          Time:null,//倒计时
          //提交参数
          form:{
            bankCode:null,//银行卡开户行编码,
            //bankName:null,//开户行名称
            bankCardNo:null,//银行卡号
            cardPhone:null,//银行卡预留手机号
            name:null,//持卡人
            //userMobile:'',//手机号
            
          },
          cardBankId:null,//验证后返回的银行卡id
          needVerifyCode:1,//验证后返回的标志  1：需要发送验证码(验证码已发送) 0:不需要发送验证码(绑卡成功)
          vcode:null,//验证码


          productId:188,//产品id 改

          //测设用 app 申请数据
          // testAppData:{
          //   appKey:"android_user",
          //   uuid:"3072562a-69d5-490c-939e-fc0a562787f8",
          //   sessionId:"a34056eea8741ea56fe0c884bcabb717",
          //   source:"JxhOfficial",
          // },
          
          addBankType:'preCollectMoney',//前置绑卡 : preCollectMoney 后置绑卡:rearCollectMoney 还款: repay
          orderId:0,
          preOrderId:0,
         
          
        }
    },
    computed:{
      // selectedBank() {
      //   return this.$store.state.bank.selectedBankStore;
      // }
      ...mapState(['bank'])
    },
    mounted() {
      document.title = "添加银行卡";  
      this.title = "添加银行卡";

      //获取绑卡类型
      //alert(this.$route.query.type)
      //this.addBankType = this.$route.query.type?'preCollectMoney':this.$route.query.type;
      this.addBankType = this.bank.saveBindCardSeq;
      //获取产品id
      this.productId =  this.bank.saveProductId;
       this.orderId =  this.bank.saveOrderId?this.bank.saveOrderId:0;

      //获取用户姓名
      this.form.name  = this.bank.userName;

      //获取临时保存的参数
      this.form = this.bank.saveAddBankInfo ? this.bank.saveAddBankInfo : this.form;

      //获取银行卡信息
      this.showBank =  this.bank.selectedBankStore;
      console.log(this.showBank)
      this.form.bankName =  this.bank.selectedBankStore ? this.bank.selectedBankStore.bankName : null;
      this.form.bankCode =  this.bank.selectedBankStore ? this.bank.selectedBankStore.bankCode : null;
      this.form.bankCardNo =  this.bank.selectedBankStore ? this.bank.selectedBankStore.bankCardNo : null;
    },
    methods: { 

      //发送验证码
      getCreateOrderByProductRequest(){
//         let newObj = this.testAppData;
//         newObj.productId = this.productId;
//         newObj.type = this.addBankType;
//          newObj.orderId = this.orderId;
// //console.log(newObj)
//        newObj = Object.assign(newObj, this.form);
//         newObj.sign = autoSign(newObj)

        var obj = new Object();
        obj.productId = this.productId;
        obj.type = this.addBankType;
        obj.orderId = this.orderId;

        obj.bankCode = this.form.bankCode;
        obj.bankCardNo = this.form.bankCardNo;
        obj.cardPhone = this.form.cardPhone;
        obj.name = this.form.name;
        
        //obj = Object.assign(obj, this.form);
        
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
        //alert(obj_str)
        sendRequest_app(createOrderByProduct, newObj).then((res) => {
          let {code,msg,result} = res;  
          let obj_str = JSON.stringify(res)
          //alert(obj_str)
              if(code == "00"){
                
                this.cardBankId = result.bankCardId;
                this.preOrderId = result.preOrderId;
                this.needVerifyCode = result.needVerifyCode;
                if(this.needVerifyCode){
                   this.isShowSendCodeAlert = true;
                   this.countdownSendCode();
                }else{
                  this.toastShowHide('您已绑卡成功','bottom',2000);
                   if(this.orderId){
                    this.$router.push({path:'/orderInfo',query:{orderId:this.orderId}});
                  }else{
                    this.$router.push({path:'/',query:{preOrderId:this.preOrderId,bankCardId:result.bankCardId,productId:this.productId}});
                  }
                  
                }
         
                delete newObj.productId;

                delete newObj.bankCode;
                delete newObj.bankName;
                delete newObj.bankCardNo;
                delete newObj.cardPhone;
                delete newObj.name;
                delete newObj.userMobile;
                let obj_str = JSON.stringify(result)
                //alert(obj_str)
 
              }else{
                 this.toastShowHide(msg,'bottom',2000);
                //this.$router.push({path:'/error'});
              }
        });
      },
      //添加银行卡
      getAddBankRequest(){
        // let newObj = this.testAppData;
        // newObj.productId = this.productId;

        // newObj.bankCardId = this.cardBankId;
        // newObj.vCode = this.vcode;
        // newObj.type = this.addBankType;
        // newObj.orderId = this.orderId;

        // newObj.sign = autoSign(newObj)


        var obj = new Object();
        obj.productId = this.productId;

        obj.bankCardId = this.cardBankId;
        obj.vCode = this.vcode;
        obj.type = this.addBankType;
        if(this.addBankType == 'preCollectMoney'){
          obj.orderId = this.preOrderId;
        }else{
          obj.orderId = this.orderId;
        }
        
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
        //alert(obj_str)
        this.isShowAdding = true;
        sendRequest_app(addBank, newObj).then((res) => {
          let {code,msg,result} = res;
           let obj_str = JSON.stringify(res)
          //alert(obj_str)
          this.isShowAdding = false;
          let _this = this;
          if(code == "00"){
            this.isShowAddSuccess = true;
            //this.preOrderId = result.preOrderId;
            delete newObj.productId;
            // let Time = window.setInterval(()=>{
            //   _this.isShowAddSuccess = false;
            if(this.orderId){
              this.$router.push({path:'/orderInfo',query:{orderId:this.orderId}});
            }else{
              this.$router.push({path:'/',query:{preOrderId:this.preOrderId,bankCardId:result.bankCardId,productId:_this.productId}});
            }
              

            // },3000);
           
           
          }
          else{
            this.isShowAddFail  = true;
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error'});
          }
        });
      },

      //选择银行卡 点击
      handleSelectBankClick(bank){
        //临时保存提交参数
        this.$store.dispatch('saveAddBankInfoAction',this.form);
        this.$router.push({path:'/bankList'});
      },
      //发送验证码 点击
      handleSendCodeClick(){
        if(this.needVerifyCode){
          this.getCreateOrderByProductRequest();
        }else{
          this.toastShowHide('您已绑卡成功','bottom',2000);
          
        }

         
       
       
        
      },
      //确认添加银行卡 点击
      handleAddBankClick(){

         if(!this.form.bankName){
          this.toastShowHide('请选择银行','bottom',2000);
          return false;
        }
        else if(!this.form.bankCardNo){
          this.toastShowHide('请输入银行卡号','bottom',2000);
          return false;
        }
        else if(!this.form.cardPhone){
          this.toastShowHide('请输入银行预留手机号','bottom',2000);
          return false;
        }
        else{
           this.getCreateOrderByProductRequest();

          //this.isShowSendCodeAlert = true;
          
        }
        
        // if(!this.cardBankId){
        //   this.toastShowHide('请发送验证码','bottom',2000);
        //   return false;
        // }
        // else if(!this.vcode){
        //   this.toastShowHide('请填入验证码','bottom',2000);
        //   return false;
        // }
        // else{
        //   this.getAddBankRequest();
        // }
      },
      //显示 银行预留手机号弹框 点击
      handleShowTipClick(){
        this.isShowPreMobileTip = true;
      },
      //隐藏 银行预留手机号弹框 点击
      handleHideTipClick(){
        this.isShowPreMobileTip = false;
      },
      // 我有疑问 到客服 点击
      handleCustomServiceClick(){
        openAppNewPageWithToolBar("https://hudai.udesk.cn/im_client/?web_plugin_id=61865");
      },
      //重新添加 点击
      handleReAddClick(){
        this.cardBankId = null;
        this.vcode = null;
        this.sendCodeNum = null;
        this.sendCodeSuccess = false;
        this.isShowAddFail  = false;
         window.clearInterval(this.Time);
      },

      //关闭验证码弹框 点击
      handleCloseSendCodeAlertClick(){
        this.sendCodeNum = null;
        this.sendCodeSuccess = false;
        this.isShowSendCodeAlert = false;
        window.clearInterval(this.Time);
      },
      //确认验证码 点击
      handleSureRepayClick(){
        if(!this.cardBankId){
          this.toastShowHide('请发送验证码','bottom',2000);
          return false;
        }
        else if(!this.vcode){
          this.toastShowHide('请输入验证码','bottom',2000);
          return false;
        }
        else{
          this.getAddBankRequest();
        }
        
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
      // promptShowHide(value,text){
      //   this.isPrompt = value;
      //   this.promptText=text;
      //   let self = this;
      //   let pmtTime = window.setTimeout(function() {
      //     self.isPrompt = 0;
      //     self.promptText = '';
      //     window.clearInterval(pmtTime);
      //   }, 2000);
      // },
      //倒计时
      countdownSendCode(){
        this.sendCodeSuccess = true;
        let _this = this;
        let second = 59;
        //修改发送验证码按钮
        this.Time = window.setInterval(()=>{
          if(second > 0){
            _this.sendCodeNum = `${second}s`;
            second --;
          }
          else{
            _this.sendCodeNum = null;
            _this.sendCodeSuccess = false;
            window.clearInterval(_this.Time);
          }
        },1000);
      },
      //手机号码格式化 前三后四
      mobileFormatter(value){
        let _front = value.substr(0,3)
        let _behind =value.substr(7,4)
        let rtVal = _front + ' ' + '****' + ' ' + _behind;
        return rtVal;
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
   
    
    .list-item{
      padding:0.9rem 0 0.4rem; 
      margin:0 0.4rem;
      border-bottom:1px solid #DDDDDD;
      display: flex;
      label{
        display: inline-block;
        flex:1;
        min-width:1rem;
        vertical-align: middle;
        font-size: 0.46rem;
      }
      input{
        flex:3;
        
        color:#1D1B1B;
        vertical-align: middle;
      }
      i{
        display: inline-block;
       
      
        background-size:100%;
        background-repeat: no-repeat;
        vertical-align: middle;
        position: relative;
        
        margin-left: 0.36rem;
      }
      .arrow{
         width: 0.24rem;
         top: 0.1rem;
         background-image: url(../assets/images/api/icon_fh@3x.png);
      }
      .qs-mark{
         width: 0.5rem;
         top: 0rem;
        background-image: url(../assets/images/api/icon_tjyhk_wenhao@3x.png);
      }
      img{
        display: inline-block;
        vertical-align: middle;
        width: 0.68rem;
        height: 0.68rem;
        margin-right:0.2rem;
      }
      .code{
        flex:3;
        display: inline-block;
        color:#FF9530;
        text-align: right;
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


  .alert-msg{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    background: rgba(0,0,0,.6);
    .alert-content{
      background: #fff;
      width: 6.8rem;
      padding: 0.6rem;
      margin:0 auto;
      position: relative;
      top:3.6rem;
      border-radius: 0.4rem;
      color:#1D1B1B;
      h4{
        font-family:PingFangSC-Medium;
        font-weight:500;
        font-size:0.5rem;
        margin-bottom: 0.2rem;
      }
      p{
        font-size:0.38rem;
        line-height: 0.68rem;
      }
      div{
        margin-top:0.48rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span{
          width: 3rem;
          text-align: center;
          padding: 0.36rem 0;
          
          font-size: 0.38rem;
        }
        .concel-btn{
          border: 1px solid #D8A154;
          color:#D8A154;
        }
        .right-btn{
          background:linear-gradient(90deg,rgba(242,214,164,1) 0%,rgba(215,160,83,1) 100%);
          color:#5C341C;
        }
      }
    }
    .load-content{
      text-align: center;
      width: 3rem;
      height: 2.2rem;
      line-height: 1.2rem;
      .loading-icon{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-size: 100%;
        background-repeat: no-repeat;
        background-image: url(../assets/images/api/pic_grzx_jz_xiao@3x.png); 

        animation: loading 2s linear alternate;
        -webkit-animation: loading 2s linear infinite;
      }
      .loading-p{
        color:#1D1B1B;
      }
    }
    .success-content{
      width: 4.8rem;
      border-radius:0.2rem;
      padding: 0.4rem;
      .success-p{
        color:#1D1B1B;
        text-align: center;
        .success-icon{
          display: inline-block;
          width: 0.68rem;
          height: 0.8rem;
          margin-right: 0.2rem;
          vertical-align: middle;
          background-size: 100%;
          background-repeat: no-repeat;
          background-image: url(../assets/images/api/icon_skyhk_xz@3x.png); 
        }
      }
    }
    .fail-content{
      text-align: center;
      padding:0;
      padding-top:0.6rem;
      h4{
        color:#1D1B1B;
        font-weight: 600;
        font-size:0.44rem;
      }
      p{
         color:#1D1B1B;
      }
      div{
        border-top:1px solid #DDDDDD;
        font-size:0.44rem;
        display: flex;
        flex-direction: row;
        span{
           padding-bottom: 0.4rem;
           display: inline-block;
           flex:1;
        }
        span:nth-of-type(1){
          color:#84878A;
          border-right: 1px solid #ddd;
        }
        span:nth-of-type(2){
          color:#FF9530;
        }
      }
    }

    .send-content{
      padding-top:0;
      width: 8rem;
      padding-bottom:0.8rem;
      h4{
        height: 1.4rem;
        line-height: 1.4rem;
        border-bottom: 1px solid #DDD;
        margin-bottom: 0.48rem;
      }
      p{
        display: flex;
        width: 88%;
        line-height: 1rem;
        margin-top: 0.6rem;
        margin: 0 auto;
        span{
          flex:1;
          display: inline-block;
        }
        span:nth-of-type(1){
          color:#84878A;
          text-align: left;
         
        }
        span:nth-of-type(2){
          color:#1D1B1B;
          text-align: right;
          
        }
      }
      .ipt-p{
        height: 1rem;
        margin:0 0.4rem;
        background: #FAFAFC;
        border:1px solid #DDD;
        input{
          color:#1D1B1B;
          background: #FAFAFC;
          padding-left:0.2rem;
          width: 78%;
        }
        em{
          color:#FF9530;
        }
      }
      .no-code{
        margin-top:0;
        text-align:right;
        display: inline-block;
        color:#84878A;
      }
      div{
        width: 88%;
        margin: 0 auto;
        margin-top: 0.76rem;
        border-top: 0;
        span{
          padding: 0.32rem 0;
        }
        span:nth-of-type(1){
          color:#D8A154;
          border:1px solid #D8A154;
          margin-right:0.2rem;
         
        }
        span:nth-of-type(2){
          color:#5C341C;
          margin-left:0.2rem;
          
        }
      }
    }


    .j-toast{
      color: #fff;
      font-size: 0.32rem;
      padding: 0.36rem 0.72rem;
    }
  }

  @keyframes loading {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
   @-webkit-keyframes loading {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }






  input-placeholder{color:#84878A;}
  ::-webkit-input-placeholder{color:#84878A;}    /* 使用webkit内核的浏览器 */
  :-moz-placeholder{color:#84878A;}                  /* Firefox版本4-18 */
  ::-moz-placeholder{color:#84878A;}                  /* Firefox版本19+ */
  :-ms-input-placeholder{color:#84878A;}           /* IE浏览器 */
}
</style>

