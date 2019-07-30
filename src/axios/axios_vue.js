import Vue from 'vue'
import axios from 'axios'
import md5 from 'js-md5'
import {AndroidOrIos} from './js/judge.js'


//axios配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded:charset=UTF-8';
axios.interceptors.request.use((config) => {
  if(config.method === 'post'){

  }
  return config;
},(error) => {
  return Promise.reject(error);
});

let controlTime = 0;
let env = "test";
let page_env = "local";//local :本地调试  online：和App集成测试;
let baseUrl = null;
console.log('process.env.BASE_API',process.env.BASE_API)
baseUrl = process.env.BASE_API;
// if(env == "test"){
//     baseUrl = "http://youdai-test.bitker.cn/v150";
// }else if (env == "prod"){
// 	 baseUrl = "https://jinxianghui-api.xnxdgj.com/v150";
// }
// console.log(baseUrl);
//url地址
// const user_getComInfo = baseUrl + "/user/getComInfo";
// const user_getDetail = baseUrl + "/user/getDetail";
// const user_preBuyService = baseUrl + "/user/preBuyService";
// const user_buyService = baseUrl + "/user/buyService";
// const member_receivePos = baseUrl + "/member/receivePos";
// const member_getAddress = baseUrl + "/member/getAddress";
// const member_index = baseUrl + "/member/index";
// const member_phoneRechargeInfo = baseUrl + "/member/phoneRechargeInfo";
// const member_phonePreRecharge = baseUrl + "/member/phonePreRecharge";
// const find_loanMarket = baseUrl + "/find/loanMarket";
// const member_phoneRechargeRecord = baseUrl + "/member/phoneRechargeRecord";
// const member_phoneRechargeDetail = baseUrl + "/member/phoneRechargeDetail";
// const user_getCreditReport = baseUrl + "/user/getCreditReport";
// const user_getCreditReportAdmin = baseUrl + "/user/getCreditReportAdmin";
// const product_getGiftProductList = baseUrl + "/product/getGiftProductList";
// const product_getMyProductList = baseUrl + "/product/getMyProductList";
// const user_getMyProductList = baseUrl + "/user/getMyProductList";
// const member_phoneRecharge = baseUrl + "/member/phoneRecharge";
// const product_applyProduct = baseUrl + "/product/applyProduct";
// const user_saveEvent = baseUrl + "/user/saveEvent";
// const member_posPreRecharge = baseUrl + "/member/posPreRecharge";
// const member_posRecharge = baseUrl + "/member/posRecharge";
// const find_loanMarketNew = baseUrl + "/find/loanMarketNew";
// const user_afterPay = baseUrl + "/user/afterPay";

// const user_refusedCompensate = baseUrl + "/user/refusedCompensate";
// const user_compensateApply = baseUrl + "/user/compensateApply";
// const user_compensateStatus = baseUrl + "/user/compensateStatus";
// const find_loanMarketIntercept = baseUrl + "/find/loanMarketIntercept";
// const find_loanMarketNew190 = baseUrl + "/find/loanMarketNew190";


const getProductInfo = baseUrl + "/productOrder/getProductInfo";//9.6获取产品基本信息(H5)
const authInformation = baseUrl + "/productOrder/authInformation";//9.8 认证信息 (H5)
const TryCalculate = baseUrl + "/productOrder/TryCalculate";//9.2 根据借款金额,还款时间,计算到账金额,日利率,利息费用
const applyProductOrder = baseUrl + "/productOrder/applyProductOrder";//9.5申请贷款产品(一键申请) (H5)
const getProductDetail = baseUrl + "/productOrder/getProductDetail";//9.7获取产品详细信息(H5)

const getProductBankList = baseUrl + "/productOrder/getProductBankList";//9.3获取贷款产品支持的银行卡列表(H5)
const createOrderByProduct = baseUrl + "/productOrder/createOrderByProduct";//9.1获取还款银行卡添加 短信验证码(H5)
const addBank = baseUrl + "/productOrder/addBank";//9.4保存还款银行卡(H5)


const getMyOrderList = baseUrl + "/productOrder/getMyOrderList";//10.1获取我的贷款订单列表(H5)
const getMyOrderDetail = baseUrl + "/productOrder/getMyOrderDetail";//10.3贷款订单详情
const cancelMyOrder = baseUrl + "/productOrder/cancelMyOrder";//10.5取消订单订单
const confirmMyOrder = baseUrl + "/productOrder/confirmMyOrder";//10.4确认借款
const getMyOrderSms = baseUrl + "/productOrder/getMyOrderSms";//10.6获取还款短信验证码
const payMyOrder = baseUrl + "/productOrder/payMyOrder";//10.7还款确认
const refundNeedVerifyCode = baseUrl + "/productOrder/refundNeedVerifyCode"; //10.12 我要还款接口(对应我要还款按钮接口，返回：还款是否需要还款验证码)

const successOrder = baseUrl + "/productOrder/successOrder"; //10.12还款账单列表

const userBankList = baseUrl + "/productOrder/userBankList"; //9.9 获取我的银行卡列表(H5)

const homeList = baseUrl + "/treasure/homeList"; //18.1首页夺宝列表|PreData







const vip_fee = 199;

// 埋点方法
function saveUserEvent(eventCode, eventMsg){
    var obj = new Object();
    obj.eventCode = eventCode;
    obj.eventMsg = eventMsg;
    var appReturnStr = getSignParamFromApp(obj);      
    let newObj = JSON.parse(appReturnStr)
    sendRequest_app(user_saveEvent, newObj).then((res) => {
    });
}

//跳转原生页面
function openAppNativeView(viewName){
    if(AndroidOrIos == 1){
        WebViewJavascriptBridge.openNativeView(viewName);
      }else{
        window.JxhAndroid.openNativeView(viewName);
      }
} 
//打开新页面
function openAppNewPage(pageUrl){
    if(AndroidOrIos == 1){
        WebViewJavascriptBridge.openNewPage(pageUrl);
      }else{
        window.JxhAndroid.openNewPage(pageUrl);
      }
} 
//关闭页面
function closeAppPage(){
  if(AndroidOrIos == 1){
      WebViewJavascriptBridge.webViewClose();
    }else{
      window.JxhAndroid.webViewClose();
    }
}

//打开第三方，加顶部返回及标题
function openAppNewPageWithToolBar(pageUrl){
    if(AndroidOrIos == 1){
        WebViewJavascriptBridge.openNewPageWithToolbar(pageUrl);
      }else{
        window.JxhAndroid.openNewPageWithToolbar(pageUrl);
      }
} 
//返回上一级
function goBackPage(){
    if(AndroidOrIos == 1){
        WebViewJavascriptBridge.webViewBack();
      }else{
        window.JxhAndroid.webViewBack();
      }
} 
//判断用户是否登录
function checkUserLoginFromApp(){
  var appReturnStatus = null;
  if(AndroidOrIos == 1){
      appReturnStatus = WebViewJavascriptBridge.checkUserLogin();
      return appReturnStatus;
  }else{
    appReturnStatus = window.JxhAndroid.checkUserLogin();
    return appReturnStatus;
  }
}



// 从app获取签名
function getSignParamFromApp(obj){
    var sendStr = "";
    Object.keys(obj).forEach(function(key){
        sendStr += ",\"" + key + "\":\"" + obj[key] + "\"" ;
    });
    if(sendStr == ""){
      sendStr = "{}";
    } else {
      sendStr = "{" + sendStr.substring(1) + "}";
    }
    var appReturnStr = "";
    if(AndroidOrIos == 1){ //ios
          appReturnStr = WebViewJavascriptBridge.getSignParam(sendStr);
          return appReturnStr;
      }else{
        appReturnStr = window.JxhAndroid.getSignParam(sendStr);
        return appReturnStr;
      }
  }

const sendRequest_app = (url, params) => { 
    let formdata = new FormData();
    Object.keys(params).forEach(function(key){
        formdata.append(key, params[key]) ;
    });
   return axios.post(url,formdata)
        .then(res => res.data);
    
} 


//测试生成签名
var autoSign = function (postData) {

  // var postData = {
  //     appKey: 'android_user',
  //     uuid: 'd3719288-19c0-4c27-af64-aa8f984a6c5a',
  //     sessionId: 'fed38e50867ec42a79e19c3034505563',
  //     source: 'JxhOfficial',
  //     productId: 1,
  //     sort: 'D haha 椎间盘买个 *&^%$#@)(-__+ ',
  //     adId: '1'
  // };

  //{"sign":"73198b9947adb4c7beda20bbc2e947ad","appKey":"android_user","source":"JxhOfficial","sessionId":"f0d9fa6696a2e6399eb212586b1c79d3","uuid":"76c29904-f4f7-46fa-822e-a93092e6a5db"}

  // 'uuid'      =>  '14c1295c-01dc-45d6-b2e9-235d6f08170e',
  //'sessionId' =>  '41687870330e8b6670feb1c2cdb4e9b9',
  delete postData.sign;

  var newKeyData = Object.keys(postData).sort();
  var str = '';
  for (var i = 0; i < newKeyData.length; i++) {
    str += newKeyData[i] + '=' + postData[newKeyData[i]].toString().trim() + '&';
  }
  str = str.substring(0, str.length - 1);

  var secretKeyDict = {
    iphone_user: '(SIGN)*(&Jj**^M<>>9>>kjfie))Y_D*&541*(^43_JKHUw116',
    android_user: '(SIGN)998KI(*9225mk)_++_)Y_D987242-+*//**342></./',
    manage_user: 'MJ,986.,*&BYT^///12((&*&HBB&T^U12..\\/\||nc'
  };

  var k = secretKeyDict[postData.appKey];

  var signStr = k + str + k;

  //console.log('==', signStr, '==');
  var sign = md5(signStr);
 //console.log(sign);
  return sign;
};



export {
  sendRequest_app,
  getSignParamFromApp,
  openAppNativeView,
  openAppNewPage,
  vip_fee,
  goBackPage,
  openAppNewPageWithToolBar,
  saveUserEvent,
  checkUserLoginFromApp,
  controlTime,
  closeAppPage,

  // 接口地址
  // user_getComInfo,
  // user_preBuyService,
  // user_buyService,
  // member_receivePos,
  // member_getAddress,
  // member_index,
  // member_phoneRechargeInfo,
  // member_phonePreRecharge,
  // find_loanMarket,
  // member_phoneRechargeRecord,
  // member_phoneRechargeDetail,
  // user_getCreditReport,
  // product_getGiftProductList,
  // product_getMyProductList,
  // user_getDetail,
  // user_getMyProductList,
  // member_phoneRecharge,
  // product_applyProduct,
  // member_posPreRecharge,
  // member_posRecharge,
  // find_loanMarketNew,
  // user_afterPay,
  // user_getCreditReportAdmin,
  // user_refusedCompensate,
  // user_compensateApply,
  // user_compensateStatus,
  // find_loanMarketIntercept,
  // find_loanMarketNew190,

  autoSign,

  getProductInfo,
  authInformation,
  getProductBankList,
  TryCalculate,
  applyProductOrder,
  getProductDetail,
  createOrderByProduct,
  addBank,
  getMyOrderList,
  getMyOrderDetail,
  cancelMyOrder,
  confirmMyOrder,
  getMyOrderSms,
  payMyOrder,
  refundNeedVerifyCode,
  successOrder,
  userBankList,


  homeList

} 



