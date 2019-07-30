<template>
  <div class="container">
    <div class="header" v-if="from">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/api/icon_back_white@3x.png" alt>
      </a>
      <span>{{title}}</span>
    </div>
    <!-- 详情 -->
    <div class="info" :style="{marginTop:from?'1.32rem':'auto'}">
      <div class="money">
        <div class="m-item">
          <label>额度</label>
          <span>{{isNaN(parseInt(productInfo.minLimit))?'--':parseInt(productInfo.minLimit)}}~{{isNaN(parseInt(productInfo.maxLimit))?'--':parseInt(productInfo.maxLimit)}}</span>
        </div>
        <div class="m-item">
          <label>期限</label>
          <span  v-if="isMultiTerm==1">{{productInfo.minTime}}~{{productInfo.maxTime}}天</span>
          <!-- 分期 -->
          <span  v-if="isMultiTerm==2">{{productInfo.minTime}}~{{productInfo.maxTime}}{{termType==1?'月':'周'}}</span>
        </div>
      </div>
      <div class="edit">
        <div class="e-item">
          <span>{{selectedMoney}} 元</span>
          <i class="yuan-icon" @click="handleShowMoneyPickerClick"></i>
        </div>
        <div class="e-item">
          <span  v-if="isMultiTerm==1">{{selectedDay}} 天</span>
           <!-- 分期 -->
           <span v-if="isMultiTerm==2">{{selectedDay}} {{termType==1?'月':'周'}}</span>
          <i class="day-icon" @click="handleShowDayPickerClick"></i>
        </div>
      </div>
      <div class="range">
         <div class="r-item">
            <label>到账金额</label>
            <p>{{accountAmount}}元</p>
        </div>
        <div class="r-item">
            <label>利息费用</label>
            <p>{{interests}} 元</p>
        </div>
        <!-- <div class="r-item" v-if="isMultiTerm==1">
            <label>利息费用</label>
            <p>{{interests}} 元</p>
        </div> -->
        <!-- <div class="r-item" v-if="isMultiTerm==1">
            <label>日利率</label>
            <p>{{ratio}}% <em style="opacity: 0;">利率</em></p>
        </div> -->
         <!-- 分期 -->
         <!-- <div class="r-item" v-if="isMultiTerm==2">
            <label>{{termType==1?'月均还款':'周均还款'}}</label>
            <p>{{average}} 元</p>
        </div> -->
        <div class="r-item">
            <label>还款金额</label>
            <p>{{repay}} 元</p>
        </div>
      </div>
    </div>
    <!--查看更多-->
    <div class="look">
      <span @click="handleToProInfoClick">查看产品详情</span>
      <i></i>
    </div>

    <!-- 公司 -->
    <div class="company">
      <label>公司</label>
      <span>{{merchantName}}</span>
      <i @click="handleShowTelClick"></i>
    </div>
    
    <!-- 认证信息 -->
    <div class="list">
      <div class="list-header">认证信息</div>
      <ul>
        <li @click="handleToIdClick">
          <label>身份信息</label>
          <span class="no-fulfil" v-if="!idFlag" >去完善</span>
          <span class="fulfil" v-if="idFlag"><i></i>已完善</span>
        </li>
        <li  @click="handleToContactClick">
          <label>紧急联系人</label>
          <span class="no-fulfil"  v-if="!contactFlag">去添加</span>
          <span class="fulfil" v-if="contactFlag"><i></i>已添加</span>
        </li>
        <li  @click="handleToTelecomClick" v-if="isShowTelecomFlag">
          <label>手机运营商</label>
          <span class="no-fulfil" v-if="!telecomFlag">去认证</span>
          <span class="fulfil" v-if="telecomFlag"><i></i>已认证</span>
        </li>
        <li  @click="handleToBankCardClick" v-if="bindCardSeq==1">
          <label>收款银行卡</label>
          <span class="no-fulfil" v-if="!bankCardFlag">去添加</span>
          <span class="fulfil" v-if="bankCardFlag"><i></i>已添加</span>
        </li>
        <!-- <li>
          <label>其他信息</label>
          <span class="no-fulfil" v-if="0">去添加</span>
          <span class="fulfil" v-if="1"><i></i>已添加</span>
        </li> -->
      </ul>
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <span v-if="!isAllPass" @click="handleCompleteInfoClick">完善认证信息</span>
      <span v-if="isAllPass" @click="handleOneKeyApplyClick">一键申请借款</span>
    </div>
    <!-- 天数选择 -->
    <div class="picker-alert" v-if="isShowDayPicker">
      <div class="picker-container">
        <mt-picker :slots="daySlots" @change="onDayValChange" :visible-item-count="5" :showToolbar="showToolbar">
          <div class="picker-header">
            <span @click="handleCloseDayPickerClick">取消</span>
            <h4>选择期限</h4>
            <span  @click="handleSelectDayClick">确定</span>
          </div>
        </mt-picker>
      </div>
    </div>
    <!-- 金额选择 -->
    <div class="picker-alert" v-if="isShowMoneyPicker">
      <div class="picker-container">
        <mt-picker :slots="moneySlots" @change="onMoneyValChange" :visible-item-count="5" :showToolbar="showToolbar">
          <div class="picker-header">
            <span @click="handleCloseMoneyPickerClick">取消</span>
            <h4>选择额度</h4>
            <span  @click="handleSelectMoneyClick">确定</span>
          </div>
        </mt-picker>
      </div>
    </div>

     <!-- 手机号码 弹框 -->
    <div class="alert-msg" v-if="isShowTelAlert">
      <div class="alert-content fail-content">
       
       <p>{{tel}}</p>
       <div>
         <span style="color:#84878A;" @click="handleHideTelClick">取消</span>
         <span style="color:#FF9530;"><a :href=" 'tel://' + tel " >呼叫</a></span>
       </div>
      </div>
    </div>

    <!-- 申请资质 弹框 -->
    <div class="alert-msg"  v-if="isShowAptitudeAlert">
      <div class="alert-content fail-content">
       <h4>温馨提示</h4>
       <p>暂无资质申请该机构</p>
       <div>
         <span style="color:#FF9530;"  @click="handleReloadClick">知道了</span>
       </div>
      </div>
    </div>
    
    
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import flexible from '../axios/js/flexible.js'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, goBackPage,controlTime} from '@/axios/axios_vue';
import {user_getMyProductList,autoSign,  getProductInfo,authInformation,TryCalculate,applyProductOrder} from '@/axios/axios_vue';
import {AndroidOrIos} from '../axios/js/judge.js' 
import util from '../axios/js/util.js';
export default {
    name:'',
    data () {
        return { 
          title:null,

          
          showToolbar:true,//picker头部显示
          isShowDayPicker:false,
          isShowMoneyPicker:false,
          selectingDay:null,//选择中
          selectingMoney:null,
          selectedDay:null,//确认选择的
          selectedMoney:null,
          daySlots: [//天数选择
            {
              flex: 1,
              values: [],
              className: '',
              textAlign: 'center'
            }
          ],
          moneySlots: [//额度选择
            {
              flex: 1,
              values: [],
              className: '',
              textAlign: 'center'
            }
          ],

          isAllPass:false,//认证信息是否全部通过

       

          productInfo:{},
          applyGroup:[
            // [2000,7],
            // [2500,7],
            // [2500,14],
            // [3000,14],
            // [3000,21]
          ],

          //认证信息
          idFlag:0,//	实名信息是否完善，0：未完善 1：已完善
          contactFlag:0,//紧急联系人信息是否完善，0：未完善 1：已完善
          telecomFlag:0,//	运营商认证，0：未完善 1：已完善
          bankCardFlag:0,//	收款银行卡，0：未完善 1：已完善
          name:null,//用户姓名

          bankCardId:0,//银行卡id 默认0

          preOrderId:0,//	预订单id


          accountAmount:null,//到账金额
          ratio:null,//利率
          interests:null,//利息

          average:null,//分期金额

          repay:null,//还款金额


          //分期新增参数

          isMultiTerm :1,// 1:普通api产品 2：分期api产品
          termType :1,//1: 一月一期 2：一周一期
          limit:[],
          time:[],


          productId:null,//产品id 改66
          //测设用 app 申请数据
          testAppData:{
            appKey:"android_user",
            uuid:"3072562a-69d5-490c-939e-fc0a562787f8",
            sessionId:"a34056eea8741ea56fe0c884bcabb717",
            source:"JxhOfficial",
          },

          isShowTelAlert:false,//电话弹框
          isShowAptitudeAlert:false,//申请资质 弹框
          merchantName:null,//	机构名称
          tel:null,//机构电话

          bindCardSeq:1,//0: 绑卡后置  1：绑卡前置
          isShowTelecomFlag:true,//显示手机运营商

          //isToApp : false,

          from:null,

        }
    },
    mounted() {
      //document.title = "商家详情";
     
      //获取连接地址的productId
      //alert(1)
      let _productId = util.GetUrlParam('productId');
      //alert(_productId)
      this.from = this.$route.query.from;
      //alert(2)
      if(_productId){
        localStorage.setItem('productId',_productId);
      }else{
         _productId =  localStorage.getItem('productId');
      }
      this.productId = _productId;
      //this.productId = util.GetUrlParam('productId') ? util.GetUrlParam('productId') : null;
     //alert(this.productId)
      this.$store.dispatch('saveProductIdAction',this.productId);
      this.bankCardId = this.$route.query.bankCardId ? this.$route.query.bankCardId : 0;
      this.preOrderId = this.$route.query.preOrderId ? this.$route.query.preOrderId : 0;
      //alert(this.bankCardId)
       window.callJsRefresh = this.callJsRefresh;  
      this.getAuthInfoRequest();
      this.getProductInfoRequest();

      //alert(1)
           

      //测试
      //this.selectedDay = this.applyGroup[0][1];
      //this.selectedMoney = this.applyGroup[0][0];
    },
    methods: {
      //获取产品基本信息
      getProductInfoRequest(){
      //   let newObj = this.testAppData;
      //   newObj.productId = this.productId;
 
      // //console.log(newObj);
      //   newObj.sign = autoSign(newObj);


        var obj = new Object();
        obj.productId = this.productId;
        
        
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
        //alert(obj_str)
        sendRequest_app(getProductInfo, newObj).then((res) => {
          let {code,msg,result} = res;
           let obj_str = JSON.stringify(res)
          //alert(obj_str)
          if(code == "00"){
            document.title = result.title;
            this.title = result.title;
            this.productInfo = result;
            

            this.isMultiTerm = result.isMultiTerm;
            this.termType = result.termType;

            this.merchantName = result.merchantName;
            this.tel = result.tel;

            let _limit = result.limit;
            let _time = result.time;
            // this.termType = 2;
            // this.isMultiTerm = 2;
            // let _limit = [5000,4000,3000,2000,1000];
            // let _time = [5,4,3,2,1]
           
            

            if(this.isMultiTerm == 1){
              this.applyGroup = result.applyGroup;
              this.selectedDay = result.applyGroup[0][1];
              this.selectedMoney = result.applyGroup[0][0];
            }else if(this.isMultiTerm == 2){
              this.selectedMoney = _limit[0];
              this. selectedDay = _time[0];
              let _applyGroup = [];
              for(let i = 0;i<_limit.length;i++){
                for(let j = 0;j<_time.length;j++){
                  let _item = [];
                  _item[0] = _limit[i];
                  _item[1] = _time[j];
                  _applyGroup.push(_item);
                }
              }
              this.applyGroup = _applyGroup;
            }
              //console.log(this.applyGroup)


            

            delete newObj.productId;

             let obj_str = JSON.stringify(result)
              //alert(obj_str)
            
            this.getTryCalculateRequest();
          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error'});
          }
        });
     },
     //获取认证信息
      getAuthInfoRequest(){
        // let newObj = this.testAppData;
        // newObj.productId = this.productId;
        // newObj.bankCardId = this.bankCardId;
        // newObj.sign = autoSign(newObj);


        var obj = new Object();
        obj.productId = this.productId;
        obj.bankCardId = this.bankCardId;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
        //alert(obj_str)
        sendRequest_app(authInformation, newObj).then((res) => {
          let {code,msg,result} = res;
          if(code == "00"){
            //console.log(result)
            let _authName = [];
            for(let item of result.checkInfo){
              _authName.push(item.name);
              switch (item.name){
                case '身份信息': this.idFlag = item.isPerfect;break;
                case '紧急联系人': this.contactFlag = item.isPerfect;break;
                case '手机运营商': this.telecomFlag = item.isPerfect;break;
                case '收款银行卡': this.bankCardFlag = item.isPerfect;break;
              }
            }
            //console.log(_authName)
            // this.idFlag = result.idFlag;
            // this.contactFlag = result.contactFlag;
            // this.telecomFlag = result.telecomFlag;
            // this.bankCardFlag = result.bankCardFlag;
            this.name = result.name;

            this.bindCardSeq = result.bindCardSeq;
            if(this.bindCardSeq==1){
              this.$store.dispatch('saveBindCardSeqAction','preCollectMoney');
            }else{
              this.$store.dispatch('saveBindCardSeqAction','rearCollectMoney');
            }
            
            if(_authName.indexOf('手机运营商')>-1){
              this.isShowTelecomFlag = true;
            }else{
              this.isShowTelecomFlag = false;
            }

            let obj_str = JSON.stringify(result)
            //alert(obj_str)

            this.$store.dispatch('saveNameAction',this.name);

            //切换到 一键申请

            let _isAllpass =  this.bindCardSeq == "1" ? this.idFlag && this.contactFlag && this.telecomFlag && this.bankCardFlag : this.idFlag && this.contactFlag && this.telecomFlag;
           
            //let _isAllpass = this.idFlag && this.contactFlag && this.telecomFlag ;
            this.isAllPass = _isAllpass;

            delete newObj.bankCardId;

            

          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error'});
          }
        });
     },
      //9.2 根据借款金额,还款时间,计算到账金额,日利率,利息费用
      getTryCalculateRequest(){
        // let newObj = this.testAppData;
        

        // newObj.productId = this.productId;
        // newObj.limit = this.selectedMoney;
        // newObj.time = this.selectedDay;

        // newObj.sign = autoSign(newObj);


        var obj = new Object();
        obj.productId = this.productId;
        obj.limit = this.selectedMoney;
        obj.time = this.selectedDay;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
      //  alert(obj_str)
        sendRequest_app(TryCalculate, newObj).then((res) => {
          let {code,msg,result} = res;
          //alert(code)
           //alert(msg)
          if(code == "00"){
            this.accountAmount = Number(result.accountAmount).toFixed(2);//到账金额
            this.ratio = result.ratio;//利率
            this.interests = Number(result.interests).toFixed(2);//利息
            this.average = result.average;//分期金额

            this.repay =Number(result.repay).toFixed(2) ;//还款金额
            

            let obj_str = JSON.stringify(result);
            //alert(obj_str);

            delete newObj.productId;
            delete newObj.limit;
            delete newObj.time;
            

          }
          else{
            this.toastShowHide(msg,'bottom',2000);
          }
        });
      },
      //9.5申请贷款产品(一键申请) (H5)
      getApplyProductOrderRequest(){

      //   let newObj = this.testAppData;
        

      //   newObj.productId = this.productId;
      //   newObj.limit = this.selectedMoney;
      //   newObj.time = this.selectedDay;

      //   newObj.accountAmount = this.accountAmount;
      //  // newObj.ratio = this.ratio;
      //   newObj.interests = this.interests;
      //   newObj.repay = this.repay;
      //   newObj.preOrderId  = this.preOrderId ;
      //   newObj.cardId = this.bankCardId;
      //   console.log(newObj)
      //   newObj.sign = autoSign(newObj);


        var obj = new Object();
        
        obj.productId = this.productId;
        obj.limit = this.selectedMoney;
        obj.time = this.selectedDay;

        obj.accountAmount = this.accountAmount;
        //obj.ratio = this.ratio;
        obj.interests = this.interests;
        obj.repay = this.repay;
        obj.preOrderId  = this.preOrderId ;
        obj.cardId = this.bankCardId;

        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj)
        // alert(obj_str)
        sendRequest_app(applyProductOrder, newObj).then((res) => {
          let {code,msg,result} = res;
          //alert(code)
          //alert(msg)
           let obj_str = JSON.stringify(res)
          //alert(obj_str)
          if(code == "00"){

            delete newObj.productId;
            delete newObj.limit;
            delete newObj.time;
            delete newObj.accountAmount;
            delete newObj.ratio;
            delete newObj.interests;

            
            this.$router.push({path:'orderInfo',query:{orderId:result.productOrderId,hideHeader:true}});

            

          }else{
             this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error'});
          }
        });

      },

     //显示 天数选择 点击
      handleShowDayPickerClick(){
       this.isShowDayPicker = true;
       this.selectDayByMoney();
      },
       //筛选当前额度下的天数
      selectDayByMoney(){
        let _applyGroup = this.applyGroup,dayArr = [];        
         for(let i = 0;i < _applyGroup.length;i ++){
           if(_applyGroup[i][0] == this.selectedMoney){
             dayArr.push(_applyGroup[i][1]);
           }
         }
         this.daySlots[0]['values'] = dayArr;

      },
      //显示 金额选择 点击
      handleShowMoneyPickerClick(){
       this.isShowMoneyPicker = true;
       this.selectMoneyByDay();
      },
      //显示手机 弹框 点击
      handleShowTelClick(){
        this.isShowTelAlert = true;
      },
      //隐藏手机 弹框 点击
      handleHideTelClick(){
        this.isShowTelAlert = false;
      },
      //筛选当前天数下的金额
      selectMoneyByDay(){
        let _applyGroup = this.applyGroup,moneyArr = [];
         for(let i = 0;i < _applyGroup.length;i ++){
           if(_applyGroup[i][1] == this.selectedDay){
             moneyArr.push(_applyGroup[i][0]);
           }
         }
         this.moneySlots[0]['values'] = moneyArr;

      },
      //选择中的 天数
      onDayValChange(picker, values) {
        this.selectingDay = values[0];
      },
       //选择中的 金额
      onMoneyValChange(picker, values) {
        this.selectingMoney = values[0];
      },
      //关闭 天选 点击
      handleCloseDayPickerClick(){
        this.isShowDayPicker = false;
      },
      //关闭 金额选 点击
      handleCloseMoneyPickerClick(){
        this.isShowMoneyPicker = false;
      },
      //确认选择 天数 点击
      handleSelectDayClick(){
        this.selectedDay = this.selectingDay;
        this.getTryCalculateRequest();
        this.isShowDayPicker = false;
      },
      //确认选择 金额 点击
      handleSelectMoneyClick(){
        this.selectedMoney = this.selectingMoney;
        this.getTryCalculateRequest();
        this.isShowMoneyPicker = false;
      },
      //查看详情 点击
      handleToProInfoClick(){
        this.$router.push({path:'productDetail'});
      },
      //身份验证 点击
      handleToIdClick(){
        console.log('App 身份验证');
        openAppNativeView("third_party_to_idcard_info");

      },
      //紧急联系人 点击
      handleToContactClick(){
        console.log('App 紧急联系人');
        openAppNativeView("third_party_to_contact");
      },
      //手机运营商 点击
      handleToTelecomClick(){
        if(!telecomFlag){
          console.log('App 手机运营商');
          openAppNativeView("third_party_to_phone_operator");
        }else{
          return false;
        }
        
      },
      //收款银行卡 点击
      handleToBankCardClick(){
        this.$router.push({path:'addBank'});
      },
      //完善信息 点击
      handleCompleteInfoClick(){
        if(this.idFlag==0){
          console.log('App 完善信息');
          openAppNativeView("third_party_to_idcard_info");
        }
         else if(this.contactFlag==0){
          console.log('App 紧急联系人');
          openAppNativeView("third_party_to_contact");
        }
        else if(this.telecomFlag==0){
          console.log('App 手机运营商');
          openAppNativeView("third_party_to_phone_operator");
        }
        else if(this.bankCardFlag==0){
          this.$router.push({path:'addBank'});
        } 
        
      },

      //一键申请 点击
      handleOneKeyApplyClick(){

        this.getApplyProductOrderRequest();
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
      // callJsRefresh
      callJsRefresh(){
        //alert('callJsRefresh');
        //window.location.href = document.referrer
        this.getAuthInfoRequest();
        this.getProductInfoRequest();
      },
    }
};
</script>
<style lang="scss" scoped>
.container {
  width: 10rem;
  background: #FAFAFC;

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
  .info{
    background: #FFF;
    padding:0.4rem;
    padding-left:0.6rem;
    padding-bottom: 0.6rem;
    .money{
      height: 1.08rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .m-item:nth-of-type(1){
       flex: 1.5;
      }
      .m-item{
        flex: 1;
        label{
          font-size:0.36rem;
          color:#84878A;
          font-weight:300;
          display: inline-block;
          margin-right:0.1rem;
        }
        span{
          font-size:0.4rem;
          color:#333943;
          font-weight:400;
        }
      }
      
    }
    .edit{
      height: 1.4rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .e-item:nth-of-type(1){
       flex: 1.5;
      }
      .m-item:last-child{
        text-align: center;
      }
      .e-item{
        flex: 1;
      }
      span{
        font-size:0.72rem;
        color:#FF9530;
        font-weight: 500;
      }
      i{
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        margin-left:0.4rem;
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .yuan-icon{
        background-image: url(../assets/images/api/icon_xgje@3x.png); 
      }
      .day-icon{
        background-image: url(../assets/images/api/icon_qxxz@3x.png); 
      }
    }
    .range{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .r-item:nth-of-type(1){
       text-align: left;
      }
     
      
      .r-item{
        flex:1;
        label{
          font-size: 0.36rem;
          color: #84878A;
          font-weight: 300;
        }
        p{
          font-size: 0.4rem;
          color: #333943;
          font-weight: 400;
          margin-top:0.16rem;
        }
      }
    }
  }
  .look{
    height: 1.46rem;
    background: #fff;
    margin-bottom: 0.4rem;
    text-align: center;
    line-height: 1.46rem;
    border-top: 1px solid #DDDDDD;
    span{
      color:#84878A;
      font-size: 0.4rem;
      vertical-align: middle;
    }
    i{
      vertical-align: middle;
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
      background-size: 100%;
      background-repeat: no-repeat;
      background-image: url(../assets/images/api/icon_jr@3x.png); 
    }
  }
  .company{
    height: 1.46rem;
    line-height: 1.46rem;
    background: #fff;
    margin-bottom: 0.4rem;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 0.4rem;
    label{
      color: #84878A;
    }
    span{
      color:#1D1B1B;
      

    }
    
    i{
      display: inline-block;
      border-left: 1px solid #DDDDDD;
      width: 1.2rem;
      height: 0.6rem;
      background-size: 48%;
      background-repeat: no-repeat;
      background-position-x: 0.4rem;
      background-image: url(../assets/images/api/icon_cpxq_dh@3x.png); 
    }
  }
  .list{
    background: #FFF;
    margin-bottom:0.36rem;
    font-size: 0.4rem;
    .list-header{
      color:#84878A;
      height: 1.46rem;
      line-height: 1.46rem;
      padding-left: 0.6rem;
      border-bottom: 1px solid #DDDDDD;
    }
    ul{
        padding-left: 0.6rem;
        li{
          height: 1.46rem;
          line-height: 1.46rem;
          border-bottom: 1px solid #DDDDDD;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
           padding-right: 0.2rem;
          label{
            display: inline-block;
            flex:1;
            color:#1D1B1B;
            font-weight:400;
            padding-left: 1rem;
            background-size: 16%;
            background-repeat: no-repeat;
            background-position: left center;
          }
          span{
            display: inline-block;
            flex:1;
            text-align: right;
            font-weight: 300;
            padding-right: 0.8rem;
            background-position: right center;
            background-size: 14%;
            background-repeat: no-repeat;
            background-image: url(../assets/images/api/icon_jr@3x.png); 
          }
          .fulfil{
            color:#2CC25D;
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
          }
          .no-fulfil{
            color:#84878A;
          }
        }
        li:nth-of-type(1){
          label{
            background-image: url(../assets/images/api/icon_sfxx@3x.png); 
          }
        }
        li:nth-of-type(2){
          label{
            background-image: url(../assets/images/api/icon_jjlxr@3x.png); 
          }
        }
        li:nth-of-type(3){
          label{
            background-image: url(../assets/images/api/icon_sjyys@3x.png); 
          }
        }
        li:nth-of-type(4){
          label{
            background-image: url(../assets/images/api/icon_skyhk@3x.png); 
          }
        }
        li:nth-of-type(5){
          label{
            background-image: url(../assets/images/api/icon_qtxx@3x.png); 
          }
        }
    }

  }
  .btn{
    width: 10rem;
    height: 1.4rem;
    margin-top:1.6rem;
    color:#5C341C;
    font-size: 0.52rem;
    font-weight: 500;
    text-align: center;
    line-height: 1.4rem;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    span{
      width: 100%;
      height: 100%;
      display: inline-block;
      background:linear-gradient(90deg,rgba(242,214,164,1) 0%,rgba(215,160,83,1) 100%);
    }
    
  }
  .picker-alert{
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      background: rgba(0,0,0,.6);
      .picker-container{
        background-color: #fff;
        text-align: center;
        position: relative;
        top: 60vh;
        height: 40vh;
        font-size: 0.42rem;
        .picker-header{
          height: 100%;
          line-height: 40px;
          padding:0 0.4rem; 
          border-bottom: 1px solid #DDDDDD;
          font-weight:500;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          span:nth-of-type(1){
            color:#84878A;
          }
          span:nth-of-type(2){
            color:#FF9530;
          }
          h4{
            color:#333943;
          }
        }
       
      }
       .picker-item{
          .picker-selected{
            background: #FAFAFC;
            border-top: 1px solid #DDDDDD;
            border-bottom: 1px solid #DDDDDD;
          }
        }
      
    }

    .alert-msg{
    width: 100%;
    height: 110%;
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
        font-weight: 500;
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
          a{
            display: inline-block;
            color:#FF9530;
            width:100%;
            height: 100%;

          }
        }
        .concel-btn{
          border: 1px solid #D8A154;
          color:#D8A154;
        }
        .right-btn{
          background:linear-gradient(90deg,rgba(242,214,164,1) 0%,rgba(215,160,83,1) 100%);
          color:#5C341C;
          flex: 1;
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
        width: 5rem;
        margin: 0 auto;
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
        height: 1.2rem;
        line-height: 1.2rem;
        border-bottom: 1px solid #DDD;
      }
      p{
        display: flex;
        width: 88%;
        line-height: 1rem;
        margin-top: 0.6rem;
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
        margin-top: 0.2rem;
        border-top: 0;
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
  }



}


@media screen and (min-width:414px) and (max-width:431px) and (orientation:portrait){
    html { font-size: 808.6%; }
}
</style>

