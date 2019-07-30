<template>
  <div class="container">
    <div  v-if="!isShowCurrentBill&&!isShowSureLoan">
      <div class="header" v-if="!hideHeader">
        <a href="javascript:void(0)" @click="goBack">
          <img src="../assets/images/api/icon_back_white@3x.png" alt>
        </a>
        <span>{{title}}</span>
      </div>
      <!-- 头部 -->
      <div class="top-header-bg">
        <div :class="headerBgClass()" v-if="isShowHeader">
          <div v-if="isShowHeaderInfo">
            <p class="large-font">{{headerInfo.title}}</p>
            <p class="gap"></p>  
            <p class="little-font">{{headerInfo.content}}</p>
          </div>
          <div v-if="isShowHeaderMoney" @click="handleHeaderClick">
            <p class="little-font">{{headerMoneyTitle}}</p>
            <p class="gap"></p>  
            <p class="large-font" style="font-size: 0.72rem;">{{showHeaderMoney}} 元</p>
            <span class="last-day" v-if="isShowLastDay">最后还款日 {{timeFormatter(orderInfo.overdueTime)}}</span>
            <!-- 分期 -->
            <span class="last-day" style="width: 2.4rem;"  v-if="isShowPayedLabel">已还账单</span>
          </div>
          
        </div>
      </div>
      <!-- 倒计时 -->
      <div class="time" v-if="isShowCountdown">
        <label>借款进度</label>
        <span><em>{{cdHour}}</em> 时 <em>{{cdMinute}}</em> 分 <em>{{cdSecond}}</em> 秒 后自动取消</span>
      </div> 
      <!-- 逾期时间 金额 -->
      <div class="time day-money" v-if="isOverdue">
        <span>已逾期<strong>{{orderInfo.overdueDays}}天</strong>，逾期费用<strong>{{orderInfo.overdueAmount}}元</strong></span>

        </div>

      <!-- 借款进程 -->
      <div class="process" v-if="isShowProcess">
        <div :class="processPointClass()"></div>
        <div class="ps-list">
          <div class="ps-list-item">
            <p class="list-item-title">完善信息</p>
            <!-- 信息完善时间 -->
            <p class="list-item-info">{{alltimeFormatter(orderInfo.doneInfoTime)}}</p>
          </div>

          <div class="ps-list-item">
            <p class="list-item-title">审核资质</p>
            <p class="list-item-info" v-if="!isShowApprovalTime">资料已提交，机构审核中…</p>
            <p class="list-item-info" v-if="isShowApprovalTime">{{alltimeFormatter(orderInfo.approvalTime)}}</p>
              
          </div>

          <div class="ps-list-item">
            <p class="list-item-title">放款到账</p>
            <p class="list-item-info" v-if="!isShowSuccessTime">{{processLastText}}</p>
            <p class="list-item-info" v-if="isShowSuccessTime">{{alltimeFormatter(orderInfo.successTime)}}</p>
          </div>
        </div>
      </div>
      <!-- 申请信息 -->
      <div class="apply-info" :style="{marginTop:isApplyInfoHeader?'1.6rem':'0',height:isApplyInfoHeader?'auto':'5.4rem'}">
        <div class="apply-name">
         <img :src="orderInfo.image" />
         <span>
           <p>{{orderInfo.productName}}</p>
           <p>{{alltimeFormatter(orderInfo.applyTime)}}</p>
         </span>
        </div>
        <div  class="apply-md">
          <div>
            <label>借款金额</label>
            <span :style="{color:isApplyInfoHeader?'#FF9530':'#1D1B1B'}">{{isNaN(parseInt(orderInfo.applyAmount))?'--':parseInt(orderInfo.applyAmount)}} 元</span>
          </div>
          <div>
            <label>借款期限</label>
            <span :style="{color:isApplyInfoHeader?'#FF9530':'#1D1B1B'}">{{orderInfo.applyTerm}} {{termType==1?'月':'周'}}</span>
            
          </div>
        </div>
      </div>




      <!-- <div class="list">
        <div class="list-item">
          <label>申请机构</label>
          <span><img :src="orderInfo.image" />{{orderInfo.productName}}</span>      
        </div>
        <div class="list-item">       
          <label>申请时间</label>
          <span>{{timeFormatter(orderInfo.applyTime)}}</span>
        </div>
        <div class="list-item">
          <label>申请金额</label>
          <span>{{orderInfo.applyAmount}} 元</span>
        </div>
        <div class="list-item">
          <label>申请期限</label>
          <span>{{orderInfo.applyTerm}} 天</span>
        </div>
        <div class="list-item">
          <label>还款利率</label>
          <span>{{termType==1?'月费率':'日费率'}}{{orderInfo.rates}}%</span>
        </div>
        <div class="list-item">
          <label>到账金额</label>
          <span>{{orderInfo.accountAmount}} 元</span>
        </div>
        <div class="list-item">
          <label>还款金额</label>
          <span>{{orderInfo.refundAmount}} 元（ 含利息{{orderInfo.interestsAmount}}元 <strong v-if="isShowoverdueAmount">+ 逾期费{{orderInfo.overdueAmount}}元</strong> ）</span>
        </div>
        <div class="list-item">
          <label>收款银行卡</label>
          <span>{{orderInfo.bank}} </span>
          <em> 尾号{{orderInfo.cardNo}}</em>
        </div>
      </div> -->

      <!-- 相关协议 -->
      <!-- <div class="protocol" v-if="isShowProtocol&&(status!=7||status!=8||status!=11)">
        <div>
          <label>相关协议</label>
         <span>我已阅读并同意 <a v-for="(item ,index) in orderInfo.loanAgreement" :href="item.url" :key="index">《{{item.title}}》</a></span>
        
        </div>
        <p>
          还款日当天，将从您绑定的银行卡中自动扣除当期还款金额，请保证卡中余额充足，以免失败，若失败请在下方主动还款。
        </p>
      </div> -->
      <div class="protocol" v-if="isShowProtocol&&(status==7||status==8||status==11)">
        <div>
          <label>相关协议</label>
         <span><a v-for="(item ,index) in orderInfo.refundAgreement" @click="handleHrefClick(item.contract_url)"  :key="index">《{{item.contract_title}}》</a></span>
        
        </div>
        <p>
          还款日当天，将从您绑定的银行卡中自动扣除当期还款金额，请保证卡中余额充足，以免失败，若失败请在下方主动还款。
        </p>
      </div>


      <!-- 到款银行 -->
      <div class="bank" v-if="isShowRepayBank">
        <p>
          <label>还款银行卡</label>
        </p>
        <p>
          <span>{{orderInfo.refundCardInfo.bankName}}</span>
          <em> 尾号{{orderInfo.refundCardInfo.cardNo}}</em>
          <i @click="handleBindCollectClick('repay')">更换</i>
        </p>
      </div>
      <!-- 分期 账单列表 -->
      <div class="wait-account-list" v-if="isDivid&&(status==7||status==8||status==11)">
        <div class="wait-title"><span>待还账单</span><em @click="handleHeaderClick">已还账单</em></div>
        <ul>
          <li v-for="(item,index) in refundList" :key="index" @click="handleDividStatusClick(item,index)">
            <p>
              <span class="num">第 {{item.periodNo}} 期</span>
              <span :class="dividStatusClass(item.status)" >{{dividStatusFormatter(item.status)}}</span>
            </p>
            <p>
              <span class="money">{{Number(item.amount).toFixed(2)}} 元</span>
              <span class="date">还款日：{{timeFormatter(item.canRepayTime)}}</span>
            </p>
            <p class="wait-overdue" v-if="item.overdueDay">已逾期{{item.overdueDay}}天，逾期费用{{item.overdueFee}}元</p>
          </li>
          <!-- <li  @click="handleDividStatusClick({})">
            <p>
              <span class="num" >第 1 期</span>
              <span class="status" >未到期</span>
            </p>
            <p>
              <span class="money">1806.27 元</span>
              <span class="date">还款日：2019-04-18</span>
            </p>
            <p class="wait-overdue">已逾期24天，逾期费用240.27元</p>
          </li> -->
        </ul>
      </div>


    </div>
    <!-- 按钮 -->
    <div class="btn" @click="handleOneKeyBorrowClick" v-if="isShowBorrowBtn">
      <span>一键申请借款</span>
    </div>

    <div class="btn " style="position: fixed;bottom: 0;" v-if="isShowSureBorrowBtn&&!isShowSureLoan">
      <span class="concel-btn" @click="handleConcelOrderClick">取消</span>
      <span @click="handleShowSureLoanClick">确认借款</span>
    </div>

     <div class="btn" style="position: fixed;bottom: 0;" @click="handleNeedBorrowClick" v-if="isShowNeedBorrowBtn" >
      <span>我要还款</span>
    </div> 

    <div class="btn" style="position: fixed;bottom: 0;" v-if="isShowRepaymentBtn">
      <span class="dis-span">还款中...</span>
    </div>

    <div class="btn" style="position: fixed;bottom: 0;" v-if="isShowBorrowingBtn">
      <span class="dis-span">确认借款中...</span>
    </div>

    <div class="btn" v-if="isShowAgainBtn"  style="position: fixed;bottom: 0;">
       <span class="concel-btn" @click="handleHeaderClick">已还账单</span>
      <span @click="handleAgainClick">再来一笔</span>
    </div>


    <div class="btn " v-if="isShowBindCollectBtn">
      <span class="concel-btn" @click="handleConcelBorrowClick">取消</span>
      <span @click="handleBindCollectClick('rearCollectMoney')">绑卡收款</span>
    </div>


    <!-- 确认借款弹框 -->
     <div class="alert-msg"  v-if="isShowSureBorrowAlert">
      <div class="alert-content fail-content">
       <h4>确认借款</h4>
       <p>确认借款后，将直接打款至您的收款银行卡</p>
       <div>
         <span @click="handleCloseConcelSureAlertClick">取消</span>
         <span @click="handleSureOrderClick">确认</span>
       </div>
      </div>
    </div> 

    <!-- 取消订单弹框 -->
     <div class="alert-msg" v-if="isShowConcelOrderAlert">
      <div class="alert-content fail-content">
       <h4>取消订单</h4>
       <p>确认取消借款订单？</p>
       <div>
         <span @click="handleCloseConcelOrderClick">取消</span>
         <span @click="handleSureConcelOrderClick">确认</span>
       </div>
      </div>
    </div> 

    <!-- 收不到验证码 弹框 -->
    <div class="alert-msg"  v-if="isShowNoCodeAlert">
      <div class="alert-content ">
        <h4>收不到验证码</h4>
        <p>1. 请检查您的手机网络是否正常；</p>
        <p>2. 确认您的手机中是否安装了短信拦截软件；</p> 
        <p>3. 请确认是否被运营商屏蔽接收，如已屏蔽请联系运营商撤销；</p> 
        <p>4. 请确保您的预留手机号与当前接收短信的手机号码一致。</p> 
        <div>
          <!-- <span class='concel-btn' @click="handleCustomServiceClick">我有疑问</span> -->
          <span class='right-btn'  @click="handleCloseCodeAlertClick">我知道了</span>
        </div>
      </div>
    </div>

    <!-- 确认借款等待弹框 -->
    <div class="alert-msg" v-if="isShowWaittingAlert"  style="z-index:9">
      <div class="alert-content fail-content">
       <h4>温馨提示</h4>
       <p>还款处理中，请耐心等待…</p>
       <div>
         <span style="color:#FF9530;" @click="handleCloseWaittingAlertClick" >确认 ( {{waittingCountdownNum}} )</span>
       </div>
      </div>
    </div>

    <!-- 还款失败 弹框 -->
    <div class="alert-msg"  v-if="isShowFailAlert">
      <div class="alert-content fail-content">
       <h4 style="color:#FF5337;">还款失败</h4>
       <p>您的账户余额不足…</p>
       <div>
         <span style="color:#FF9530;"  @click="handleReloadClick">我知道了</span>
       </div>
      </div>
    </div>

    <!-- 还款成功 弹框 -->
    <div class="alert-msg" v-if="isShowSuccessAlert">
      <div class="alert-content fail-content">
       <h4 style="color:#2CC25D;">已还款</h4>
       <p>恭喜您，还款成功！</p>
       <div>
         <span style="color:#FF9530;" @click="handleReloadClick">我知道了</span>
       </div>
      </div>
    </div>

    <!-- 还款验证码校验 弹框 -->
    <div class="alert-msg"  v-if="isShowSendCodeAlert">
      <div class="alert-content fail-content send-content">
        <h4>还款验证码校验</h4>
        <p><span>验证码将发送至</span><span>{{mobileFormatter(orderInfo.userMobile)}}</span></p>
        <p class="ipt-p">
          <input v-model="code" placeholder="请输入短信验证码" />
          <em  v-if="sendCodeSuccess">{{sendCodeNum}}</em>
          <em @click="handleSendCodeClick" v-if="!sendCodeSuccess">获取</em>
        </p>
         <p class="no-code"><span @click="handleCanotReceiveCodeClick">收不到验证码 ？</span></p>
        <div>
          <span class='concel-btn' @click="handleCloseSendCodeAlertClick">取消</span>
          <span class='right-btn'  @click="handleSureRepayClick">确认</span>
        </div>
      </div>
    </div>


    <!-- 分期 全部结清弹框 -->
     <div class="alert-msg"  v-if="isShowSureAllRepayAlert">
      <div class="alert-content fail-content">
       <h4>温馨提示</h4>
       <p>全部结清将一次性将剩余期数全部还款，您是否要结清？</p>
       <div>
         <span @click="handleCloseAllRepayAlertClick">取消</span>
         <span @click="handleSureAllRepayClick">确认</span>
       </div>
      </div>
    </div> 


    <!-- 分期 -->
    <div  class="cur-bill" v-if="isShowCurrentBill">
      <div class="header" style="z-index:1">
        <a href="javascript:void(0)" @click="goBackThis">
          <img src="../assets/images/api/icon_back_white@3x.png" alt>
        </a>
        <span>本期账单</span>
      </div>
      <ul>
        
        <li>
          <label>期数</label>
          <span>第 {{selectedCurrentBill.periodNo}} 期</span>
        </li>
        <li>
          <label>状态</label>
          <span :style="{color:selectedCurrentBill.status==3?'#FF5337':'#1D1B1B'}">{{dividStatusFormatter(selectedCurrentBill.status)}}</span>
        </li>
        <li>
          <label>还款金额</label>
          <span style="color:#FF9530">{{selectedCurrentBill.amount}} 元</span>
        </li>
        <li style="height:auto">
          <p>{{selectedCurrentBill.remark}}</p>
        </li>

        <!-- <li>
          <label>本金</label>
          <span>1000.00 元</span>
        </li>
        <li>
          <label>利息</label>
          <span>50.00 元</span>
        </li> -->
        <li v-if="isOverdue">
          <label>逾期天数</label>
          <span>{{selectedCurrentBill.overdueDay}} 天</span>
        </li>
        <li v-if="isOverdue">
          <label>逾期费用</label>
          <span >{{selectedCurrentBill.overdueFee}} 元</span>
        </li>
        <!-- <li>
          <label>服务费用</label>
          <span>50.00 元</span>
        </li> -->
        <li>
          <label>还款日期</label>
          <span style="color:#FF5337">{{timeFormatter(selectedCurrentBill.canRepayTime)}}</span>
        </li>
      </ul>
      <!-- <p>{{selectedCurrentBill.remark}}</p> -->


    </div>

<!-- 借款详情 -->
    <div class="sure-loan" v-if="isShowSureLoan">
      <div class="header" v-if="!hideHeader">
        <a href="javascript:void(0)" @click="handleShowMainOrderInfoClick">
          <img src="../assets/images/api/icon_back_white@3x.png" alt>
        </a>
        <span>借款详情</span>
      </div>
      <ul>
        <li>
          <label>借款金额</label>
          <span style="color:#FF9530">{{orderInfo.applyAmount}} 元</span>
        </li>
        <li >
          <label>借款期限</label>
          <span>{{orderInfo.applyTerm}}{{termType==1?'月':'周'}}</span>
        </li>
        <li style="margin-bottom:0.32rem;border:0">
          <p>{{orderInfo.remark}}</p>
        </li>
        <!-- <li>
          <label>借款利息</label>
          <span>19.00 元</span>
        </li>
        <li style="margin-bottom:0.32rem;border:0">
          <label>服务费用</label>
          <span>209.00 元</span>
        </li> -->
        <li >
          <label>到账金额</label>
          <span>{{orderInfo.accountAmount}} 元</span>
        </li>
        <li style="margin-bottom:0.32rem;border:0">
          <label>到账银行</label>
          <span>{{orderInfo.accountCardInfo.bankName}}<em>（{{orderInfo.accountCardInfo.cardNo}}）</em></span>
        </li>
        <li >
          <label>到期应还</label>
          <span>{{orderInfo.refundAmount}} 元</span>
        </li>
        <!-- <li>
          <label>还款计划</label>
          <span class="arrow">首期还款日<em> 2019-02-27</em><i></i></span>  
        </li> -->
      </ul>
      <div class="loan-protocol">
        <i></i>
        <span>我已阅读并同意<a v-for="(item ,index) in orderInfo.loanAgreement" @click="handleHrefClick(item.contract_url)" :key="index">《{{item.contract_title}}》</a>
        <!-- <a href="#">《平台服务协议》</a><a href="#">《扣款协议》</a> 《借款协议》-->
        </span>
      </div>
      <!-- 按钮 -->
      <div class="btn" style="position: absolute;bottom: 0;" @click="handleShowSureOrderAlertClick">
        <span>确认借款</span>
      </div>
    </div>

  

    
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import flexible from '../axios/js/flexible.js'
import {sendRequest_app, getSignParamFromApp, openAppNativeView,openAppNewPageWithToolBar, goBackPage,controlTime} from '@/axios/axios_vue';
import {user_getMyProductList,  autoSign,getMyOrderDetail,cancelMyOrder,confirmMyOrder,getMyOrderSms,payMyOrder,refundNeedVerifyCode} from '@/axios/axios_vue';
import {AndroidOrIos} from '../axios/js/judge.js' 
import util from '../axios/js/util.js';
export default {
    name:'',
    inject:['reload'],
    data () {
        return { 
          title:null,
          headerInfo:{title:null,content:null},//头部信息
          headerMoneyTitle:null,//头部金额标题

          hideHeader:true,//是否隐藏标题

          //确认借款倒计时
          cdHour:null,
          cdMinute:null,
          cdSecond:null,
          lastSecond:null,

          sendCodeNum:null,//发送验证码
          sendCodeSuccess:null,
          Time:null,
          needVerifyCode:1,	//1：需要再次发送验证码 0:不需要再次发送验证码

          waittingCountdownNum:'10s',//弹框倒计时

          code:null,//验证码
          
          isApplyInfoHeader:false,//申请信息是否在头部
          isShowProtocol:false,//相关协议
          isShowHeader:true,//头部显示
          showHeaderMoney:null,//头部金额
          isShowHeaderInfo:false,//头部信息
          isShowHeaderMoney:false,//头部金额
          isShowLastDay:false,//最后还款日
          isShowCountdown:false,//倒计时
          isShowRepayBank:false,//还款银行
          isShowProcess:false,//借款进程
          isOverdue:false,//逾期
          isShowoverdueAmount:false,//逾期费用显示

          isShowApprovalTime:false,//审批时间
          isShowSuccessTime:false,

          isShowBorrowBtn:false,//一键借款 按钮
          isShowSureBorrowBtn:false,//确认借款 按钮
          isShowNeedBorrowBtn:false,//我要接款
          isShowRepaymentBtn:false,//还款处理中
          repaymentBtnStatusText:'',//状态文字
          isShowAgainBtn:false,//再来一笔
          isShowBorrowingBtn:false,//确认借款中按钮

          isShowBindCollectBtn:false,//绑卡收款按钮

          isShowSureBorrowAlert:false,//确认借款 弹框
          isShowConcelOrderAlert:false,//取消订单 弹框
          isShowNoCodeAlert:false, //是否显示收不到验证码 弹框
          isShowWaittingAlert:false,//确认借款中。。。 弹框
          isShowFailAlert:false,//还款失败 弹框
          isShowSuccessAlert:false,//还款成功 弹框
          isShowSendCodeAlert:false,//还款验证码校验 弹框
          isShowSureAllRepayAlert:false,//全部结清 弹框

          processLastText:null,//进程最后的文字
          
          productId:null,
          orderId:null,//订单id 参数
          periodNo:0,//分期期数 不分期默认为0
          dividStatus:[],//分期状态数组

          orderInfo:{image:'#',applyTime:'0'},//接口返回订单列表信息

          status:-1,
          //订单状态
          orderStatus:[
            {value:2,label:'资质审核中…'},//审批中(已经申请借款) o
            {value:3,label:'审批已拒绝'},//审批失败 r
            {value:4,label:'待确认'},//等待确认借款(审批成功,等待确认) o
            {value:5,label:'已取消'},//取消借款 b
            {value:6,label:'机构打款中…'},//打款中(已经确认借款)  g
            {value:7,label:'我要还款'},//打款成功(可以还款了) o
            {value:8,label:'已逾期'},//已经逾期 r
            {value:9,label:'已结清'},//已还款 o
            {value:10,label:'打款失败'}, //////打款失败 r
            {value:11,label:'还款中…'}, //////还款中 g

            {value:12,label:'审核未通过'}, //////确认借款失败
            {value:13,label:'待开户'}, //////待开户
            {value:14,label:'待提现'}, //////待提现
            {value:15,label:'还款失败'}, //////还款失败
            {value:16,label:'审核未通过'}, //////审核未通过 推送失败 r
            {value:1,label:'待推送'}, //////待推送 o
            {value:17,label:'待绑卡'}, //////待绑卡 r
           
            
          ],


          //分期
          isDivid:false,//是否分期
          isShowPayedLabel:false,//是否显示已还分期label
          termType :1,//1: 一月一期 2：一周一期
          avgPayAmount:null,//月均还款 周均还款
          refundList:[],//分期信息

          isShowCurrentBill:false,//是否显示当前分期订单
          selectedCurrentBill:null,//选择的当前分期账单

          isShowSureLoan:false,//是否显示确认借款页面





          //测设用 app 申请数据
          // testAppData:{
          //   appKey:"android_user",
          //   uuid:"3072562a-69d5-490c-939e-fc0a562787f8",
          //   sessionId:"a34056eea8741ea56fe0c884bcabb717",
          //   source:"JxhOfficial",
          // },
        }
    },
    mounted() {
      document.title = "订单详情";  
      this.title = "订单详情";
      this.orderId = this.$route.query.orderId;
      this.$store.dispatch('saveOrderIdAction',this.orderId);

      let _hideHeader = this.$route.query.hideHeader;
      this.hideHeader = _hideHeader;

      //this.orderId = 16;
      
      this.getMyOrderDetailRequest();
    },
    methods: {

      //贷款订单详情
      getMyOrderDetailRequest(){
      //   let newObj = this.testAppData;
      //   newObj.orderId = this.orderId;
 
      // //console.log(newObj);
      //   newObj.sign = autoSign(newObj)

 
        var obj = new Object();
        obj.orderId = this.orderId;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj);
        //alert(obj_str)
        sendRequest_app(getMyOrderDetail, newObj).then((res) => {
          let {code,msg,result} = res;
          // alert(code)
          // alert(msg)
          let obj_str = JSON.stringify(result);
          //alert(obj_str)
          if(code == "00"){
            this.orderInfo = result.orderInfo;
           
            if(Number(this.orderInfo.overdueAmount) > 0){
              this.isShowoverdueAmount = true;
            }
            this.status =  Number(result.orderInfo.status);
           //this.status = 17
            //this.orderInfo.overdueDays = 67;
           // this.orderInfo.overdueTime = 1651872922;
           //systemCancelTime //系统取消订单时间
            //逾期天数
            this.orderInfo.overdueDays = this.calculateOverdueDays(this.orderInfo.overdueTime);
            //用户手机
            this.orderInfo.userMobile = result.phone;// "18756568787"
            this.productId = result.orderInfo.productId

            this.$store.dispatch('saveProductIdAction',result.orderInfo.productId);
            //分期信息
            this.refundList =  result.orderInfo.refundList; //分期信息
            this.avgPayAmount = result.orderInfo.avgPayAmount;//月均还款
            this.termType = result.orderInfo.termType;//分期信息


            //  this.refundList =  [
            //    {amount:100,periodNo:1,dueTime:1651872922,status:'1',overdueDay:null,overdueFee:10},
            //    {amount:200,periodNo:2,dueTime:1651872922,status:'2',overdueDay:null,overdueFee:20},
            //    {amount:300,periodNo:3,dueTime:1651872922,status:'3',overdueDay:3,overdueFee:30},
            //    {amount:400,periodNo:4,dueTime:1651872922,status:'4',overdueDay:null,overdueFee:30},
            //  ]

            this.isDivid = this.refundList.length>0?true:false;
            let _this = this;
            this.refundList.map((item)=>{
              _this.dividStatus.push(item.status);
            })
            
            //this.isDivid =  this.status == 7;
           

            
            this.setShowByStatus();
            
            
            
            
            //delete newObj.orderId;
          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error_header'});
          }
        });
      },
       //取消订单
      getCancelMyOrderRequest(){
      //   let newObj = this.testAppData;
      //   newObj.orderId = this.orderId;
 
      // //console.log(newObj);
      //   newObj.sign = autoSign(newObj)


        var obj = new Object();
        obj.orderId = this.orderId;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        sendRequest_app(cancelMyOrder, newObj).then((res) => {
          let {code,msg,result} = res;
          if(code == "00"){
            this.isShowConcelOrderAlert = false;

            this.isShowBindCollectBtn = false;
            this.isShowSureBorrowBtn = false;
            this.getMyOrderDetailRequest();
            this.$router.go(0);

          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error_header'});
          }
        });
      },
       //确认借款
      getConfirmMyOrderRequest(){
      //   let newObj = this.testAppData;
      //   newObj.orderId = this.orderId;
 
      // //console.log(newObj);
      //   newObj.sign = autoSign(newObj)


        var obj = new Object();
        obj.orderId = this.orderId;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj);
        //alert(obj_str)
        sendRequest_app(confirmMyOrder, newObj).then((res) => {
          let {code,msg,result} = res;
          //  alert(code)
          // alert(msg)
          // let obj_str = JSON.stringify(result)
          // alert(obj_str)
          if(code == "00"){
            this.isShowSureBorrowAlert = false;
            this.isShowSureBorrowBtn = false;
            this.isShowSureLoan = false;
            //this.reload();
            //this.$router.go(0);
            this.getMyOrderDetailRequest();

          }else{
             this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error_header'});
          }
        });
      },
      //发送验证码
      getMyOrderSmsRequest(){
        // let newObj = this.testAppData;
        // newObj.orderId = this.orderId;
 
        // newObj.periodNo = this.periodNo;
        // newObj.sign = autoSign(newObj);


        var obj = new Object();
        obj.orderId = this.orderId;
        obj.periodNo = this.periodNo;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        sendRequest_app(getMyOrderSms, newObj).then((res) => {
          let {code,msg,result} = res;
          if(code == "00"){
            this.countdownSendCode();
          }else{
             this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error_header'});
          }
        });
      },
      //确认还款
      getPayMyOrderRequest(){
      //   let newObj = this.testAppData;
      //   newObj.orderId = this.orderId;
      //    newObj.verifyCode = this.code;
      //   newObj.periodNo = this.periodNo;
 
      //  //console.log(newObj);
      //   newObj.sign = autoSign(newObj);

        var obj = new Object();
        obj.orderId = this.orderId;
        obj.verifyCode = this.code;
        obj.periodNo = this.periodNo;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        sendRequest_app(payMyOrder, newObj).then((res) => {
          let {code,msg,result} = res;
          if(code == "00"){
            this.isShowWaittingAlert = true;//等待
            this.countdownWaitting();
            //this.isShowSuccessAlert = true;
            let _this = this;
              let _Time = setTimeout(() => {
                  _this.$router.go(0);
              }, 10000);
            
            //delete newObj.orderId;
            //delete newObj.code;
          }else{
             this.toastShowHide(msg,'bottom',2000);
             this.isShowFailAlert = true;
             let _this = this;
              let _Time = setTimeout(() => {
                  _this.$router.go(0);
              }, 2000);
            
            //this.$router.push({path:'/error_header'});
          }
        });
      },
      //我要还款接口
      refundNeedVerifyCodeRequest(){

        //   let newObj = this.testAppData;
        //   newObj.orderId = this.orderId;
        //  newObj.periodNo = this.periodNo;
  
        //  //console.log(newObj);
        //   newObj.sign = autoSign(newObj);


        var obj = new Object();
        obj.orderId = this.orderId;
        obj.periodNo = this.periodNo;
        var appReturnStr = getSignParamFromApp(obj);
        let newObj = JSON.parse(appReturnStr);
        let obj_str = JSON.stringify(newObj);
        //alert(obj_str)
        sendRequest_app(refundNeedVerifyCode, newObj).then((res) => {
          let {code,msg,result} = res;
          //alert(code)
          //alert(msg)
          //let obj_str = JSON.stringify(result);
          //alert(obj_str)
          if(code == "00"){
            let needVerifyCode = result.needVerifyCode;//	1 ： 需要验证码 0:不需要发送验证码
            if(needVerifyCode == 1){
              this.isShowSendCodeAlert = true;
              // if(!this.sendCodeSuccess){
              //   this.getMyOrderSmsRequest();
              // }
              
            }else{
              this.isShowWaittingAlert = true;//等待
              this.countdownWaitting();
              //this.isShowSuccessAlert = true;
              let _this = this;
              let _Time = setTimeout(() => {
                  _this.isShowSureBorrowAlert = false;
                  _this.isShowSureBorrowBtn = false;
                  _this.isShowSureLoan = false;
                  //_this.reload();
                  //_this.$router.go(0);
                  _this.getMyOrderDetailRequest();
              }, 10000);
            
            }
            
            
            //delete newObj.orderId;
            //delete newObj.code;
          }else{
             this.toastShowHide(msg,'bottom',2000);
           // this.$router.push({path:'/error_header'});
          }
        });
      },
      //头部点击 已还账单
      handleHeaderClick(){
        this.$router.push({path:'/repaidBill',query:{orderId:this.orderId}});
        // if(this.isDivid){
        //   this.$router.push({path:'/repaidBill',query:{orderId:this.orderId}});
        // }else{
        //   return false;
        // }
      },
      //分期状态点击
      handleDividStatusClick(item,index){
        if(index==0){

           //item.status = 3;
            this.isOverdue = item.status == 3 ?true:false;
            
            //if(item.status != 1){
            // this.$router.push({path:'/currentBill',params:{...item}});
            this.periodNo = item.periodNo;
            this.isShowCurrentBill = true;
            this.selectedCurrentBill = item;
            if(item.status == 4){
              this.isShowRepaymentBtn = true;
              this.isShowNeedBorrowBtn = false;
            }else{
              this.isShowNeedBorrowBtn = true;
              this.isShowRepaymentBtn = false;
            }


        }else{

          let arrLen = index;
          let _arr = []
          for(var i = 0;i<index;i++){
            _arr.push(this.dividStatus[i])
          }
          
          //let aheadItemStatus = this.dividStatus[index-1];
          if(_arr.indexOf(4)>-1){
            this.toastShowHide('还款处理中，请稍后再试','bottom',2000);
            
            
          }else{
             //item.status = 3;
              this.isOverdue = item.status == 3 ?true:false;
              
              //if(item.status != 1){
              // this.$router.push({path:'/currentBill',params:{...item}});
              this.periodNo = item.periodNo;
              this.isShowCurrentBill = true;
              this.selectedCurrentBill = item;
              if(item.status == 4){
                this.isShowRepaymentBtn = true;
                this.isShowNeedBorrowBtn = false;
              }else{
                this.isShowNeedBorrowBtn = true;
                this.isShowRepaymentBtn = false;
              }
          }
        }
        

       
        // }else{
        //   return false;
        // }
      },

      //一键借款 点击
      handleOneKeyBorrowClick(){
        console.log('更新状态到审批中 页面刷新');
        //this.status = 2;
        this.$router.go(0);
      },
      //取消订单点击
      handleConcelOrderClick(){
        this.isShowConcelOrderAlert = true;
      },
      //关闭 取消弹框 点击
      handleCloseConcelOrderClick(){
        this.isShowConcelOrderAlert = false; 
      },
      //确认 取消弹框 点击
      handleSureConcelOrderClick(){
        this.getCancelMyOrderRequest();
        //this.isShowConcelOrderAlert = false;
      },
      //显示确认借款页面 点击
      handleShowSureLoanClick(){
        this.isShowSureLoan = true;
      },
      //显示 订单首页 点击
      handleShowMainOrderInfoClick(){
         this.isShowSureLoan = false;
         this.isShowSureBorrowAlert = false;
      },
      //确认借款 点击
      handleShowSureOrderAlertClick(){
        this.isShowSureBorrowAlert = true;
      },
      //关闭 确认借款弹框 点击
      handleCloseConcelSureAlertClick(){
        this.isShowSureBorrowAlert = false;
      },
      //确认 借款 点击
      handleSureOrderClick(){
        this.getConfirmMyOrderRequest();
      },

      //取消借款 点击
      handleConcelBorrowClick(){
        this.isShowConcelOrderAlert = true;
        //this.getCancelMyOrderRequest();
        //alert('取消借款');
      },
      //绑卡收款 点击
      handleBindCollectClick(type){
        this.$store.dispatch('saveBindCardSeqAction',type);
        this.$router.push({path:'userBankList'});

      },

      //我要还款 打开还款验证码弹框 点击
      handleNeedBorrowClick(){
        
        this.refundNeedVerifyCodeRequest();
        
      },

      //收不到验证码 点击
      handleCanotReceiveCodeClick(){
        this.isShowSendCodeAlert = false;
        this.isShowNoCodeAlert = true;
      },
      //关闭收不到验证码弹框 点击
      handleCloseCodeAlertClick(){
        this.isShowNoCodeAlert = false;
        this.isShowSendCodeAlert = true;
      },
      //关闭还款验证码弹框 点击
      handleCloseSendCodeAlertClick(){
        this.isShowSendCodeAlert = false;
        this.isShowWaittingAlert = false;
        this.waittingCountdownNum = null;
        //window.clearInterval(this.Time);
      },
      //发送验证码 点击
      handleSendCodeClick(){
        this.getMyOrderSmsRequest();
        //this.countdownSendCode();
      },
      //确认还款 点击
      handleSureRepayClick(){
        if(!this.code){
          this.toastShowHide('请填入验证码','bottom',2000);
        }else{
          this.getPayMyOrderRequest();
        }
        
      },
      //关闭等待弹框 点击
      handleCloseWaittingAlertClick(){
         this.isShowWaittingAlert = false;
         this.$router.go(0);
      },
      //还款失败 成功 弹框 刷新页面 点击
      handleReloadClick(){
        this.$router.go(0);
      },
      //再来一笔 点击
      handleAgainClick(){
        this.$router.push({path:'/',query:{productId:this.productId,from:'orderInfo'}});
        //this.$router.push({path:'productList',query:{type:'pendingComplete'}});
      }, 
      //全部结清点击
      handleShowAllRepayAlertClick(){
        this.isShowSureAllRepayAlert = true;
      },
      //关闭 全部结清弹框 点击
      handleCloseAllRepayAlertClick(){
        this.isShowSureAllRepayAlert = false;
      },
      //确认 全部结清 点击
      handleSureAllRepayClick(){
        this.periodNo = 'all';
        this.isShowSureAllRepayAlert = false;
        this.refundNeedVerifyCodeRequest();
      },

      //协议跳转
      handleHrefClick(url){
        openAppNewPageWithToolBar(url);
      },
      //状态控制显示区域
      setShowByStatus(){
        switch(this.status){
          case -1://信息已经完善
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;
            this.isShowBorrowBtn = true;

            this.headerInfo.title = '信息已完善';
            this.headerInfo.content = '您已完善个人信息';
            break;
          case 2://审批中
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;

            this.processLastText = '审批通过后，即可绑卡收款';

            this.headerInfo.title = '资质审核中…';
            this.headerInfo.content = '资料已提交，请耐心等候';
            break;
          case 3://审批失败
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;

            this.headerInfo.title = '审批已拒绝';
            this.headerInfo.content = '您的借款审批未通过';

            this.processLastText = '绑卡成功并确认，立即放款';




            break;
          case 4://等待确认
            // this.isShowHeaderMoney = true;
            if(this.orderInfo.systemCancelTime){
              this.isShowCountdown = true;
            }
             
            // this.isShowProcess = true;
             this.isShowSureBorrowBtn = true;

            // this.headerMoneyTitle = '借款金额';
            // this.showHeaderMoney = this.orderInfo.applyAmount; 

            this.isShowHeaderInfo = true;
            this.isShowProcess = true;
            this.isShowApprovalTime = true;

            this.headerInfo.title = '待确认';
            this.headerInfo.content = '绑卡成功，待确认借款';

            this.processLastText = '确认借款，立即审批';

            this.calculateSecond(this.orderInfo.systemCancelTime);
            break;
          case 5://已经取消
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;

            this.headerInfo.title = '已取消';
            this.headerInfo.content = '您的借款订单已取消';

            this.isShowApprovalTime = true;
            this.processLastText = '绑卡成功并确认，立即放款';
            break;

          case 6://打款中
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;
            this.isShowCountdown = false;
            //this.headerInfo.title = '机构打款中…';
            //this.headerInfo.content = '正在打款中，请耐心等待';

            this.headerInfo.title = '借款审批中…';
            this.headerInfo.content = '请耐心等待审批结果';

            this.isShowApprovalTime = true;
            this.processLastText = '审批通过后，立即放款';
            break;
          case 7://打款成功(可以还款了)
            //this.isShowHeaderMoney = true;
            this.isShowHeader = false;
            this.isShowRepayBank = true;
            this.isApplyInfoHeader = true;
            this.isShowProtocol = true;
            //this.showHeaderMoney = this.orderInfo.refundAmount; 
            // if(this.isDivid){
            //   this.isShowPayedLabel = true;
            //   this.headerMoneyTitle = '待还总额';
            // }else{
            //   this.isShowLastDay = true; 
            //   this.headerMoneyTitle = '待还金额';
            //   this.isShowNeedBorrowBtn = true;
            // }
            break;
          case 8://已经逾期
            // this.isShowHeaderMoney = true;
            // this.isShowRepayBank = true;
            // this.showHeaderMoney = this.orderInfo.refundAmount; 

            
            // if(this.isDivid){
            //   this.isShowPayedLabel = true;
            //   this.headerMoneyTitle = '待还总额';
            // }else{
            //   this.isShowLastDay = true; 
            //   this.headerMoneyTitle = '待还金额';
            //   this.isOverdue = true;
            //   this.isShowNeedBorrowBtn = true; 
            // }

            //this.isShowHeaderMoney = true;
            this.isShowHeader = false;
            this.isShowRepayBank = true;
            this.isApplyInfoHeader = true;
            this.isShowProtocol = true;
           
            break;
          case 9://已结清
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;
            this.isShowAgainBtn = true;

            this.isShowApprovalTime = true;
            this.isShowSuccessTime = true;

            this.headerInfo.title = '已结清';
            this.headerInfo.content = '您的借款订单已成功还款';
            break;


          case 11://还款中
            // this.isShowHeaderMoney = true;
            // this.isShowRepayBank = true;
            // this.showHeaderMoney = this.orderInfo.refundAmount; 

            // if(this.isDivid){
            //   this.isShowPayedLabel = true;
            //   this.headerMoneyTitle = '待还总额';
            // }else{
            //   this.isShowLastDay = true;
            //   this.isShowRepaymentBtn = true;
            //   this.repaymentBtnStatusText = '还款处理中...'
            //   this.headerMoneyTitle = '待还金额';
            // // this.isShowWaittingAlert = true;//等待
            //   //this.isShowSuccessAlert = true;//成功
            //   //this.isShowFailAlert = true;//失败
            //   this.countdownWaitting();
            // }
            //this.isShowHeaderMoney = true;
            this.isShowHeader = false;
            this.isShowRepayBank = true;
            this.isApplyInfoHeader = true;
            this.isShowProtocol = true;
            //this.showHeaderMoney = this.orderInfo.refundAmount; 
            // if(this.isDivid){
            //   this.isShowPayedLabel = true;
            //   this.headerMoneyTitle = '待还总额';
            // }else{
            //   this.isShowLastDay = true; 
            //   this.headerMoneyTitle = '待还金额';
            //   this.isShowNeedBorrowBtn = true;
            // }


            break;

          case 10://打款失败
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;

            this.headerInfo.title = '打款失败';
            this.headerInfo.content = '打款失败';
            break;
            
          case 1://待推送
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;

            this.headerInfo.title = '正在审批中…';
            this.headerInfo.content = '机构审批中，请耐心等待';
            break;
          case 12://确认借款失败
           
            this.isShowHeaderInfo = true;
            //this.isShowHeaderMoney = true;
            this.isShowProcess = true;
            //this.isShowBorrowingBtn = true;
            //this.repaymentBtnStatusText = '确认借款中...'

            //this.headerMoneyTitle = '借款金额';
            //this.showHeaderMoney = this.orderInfo.applyAmount; 

           // this.isShowWaittingAlert = true;//等待
            //this.isShowSuccessAlert = true;//成功
            //this.isShowFailAlert = true;//失败

            this.headerInfo.title = '审核未通过';
            this.headerInfo.content = '由于您的资质不足，您没有通过审核';

            this.processLastText = '绑卡成功并确认，立即放款';

            break;
          case 13://待开户
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;

            this.headerInfo.title = '待开户';
            this.headerInfo.content = '';
            break;
          case 14://待提现
            this.isShowHeaderInfo = true;

            this.headerInfo.title = '待提现';
            this.headerInfo.content = '';
            this.isShowRepaymentBtn = true;
            this.repaymentBtnStatusText = '等待提现中...'
            break;
          case 15://还款失败
            this.isShowHeaderMoney = true;
            this.isShowLastDay = true;
            this.isShowRepayBank = true;
            //this.isShowNeedBorrowBtn = true;
            this.showHeaderMoney = this.orderInfo.refundAmount; 

            this.headerMoneyTitle = '待还金额';
            this.isShowFailAlert = true;//失败
            break;

           case 16://审核未通过
           
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;
            this.headerInfo.title = '审核未通过';
            this.headerInfo.content = '由于您的资质不足，您没有通过审核';
            this.processLastText = '绑卡成功并确认，立即放款';
            break;


          // case 16://推送失败
          //   this.isShowHeaderInfo = true;
          //   this.isShowProcess = true;

          //   this.headerInfo.title = '推送失败';
          //   this.headerInfo.content = '';
          //   break;

          case 17://等待绑卡
            this.isShowHeaderInfo = true;
            this.isShowProcess = true;

            this.isShowApprovalTime = true;
            this.processLastText = '绑卡成功，确认借款';

            this.isShowBindCollectBtn = true;

            this.headerInfo.title = '待绑卡';
            this.headerInfo.content = '请添加您的收款银行卡';
            break;


         
          default:break;
        }
      },
      //分期状态格式
      dividStatusFormatter(status){
        switch (status+''){
          case '1': return '待还款' ;break;
          case '2': return '已还款' ;break;
          case '3': return '已逾期' ;break;
          case '4': return '还款处理中' ;break;
          default:break;
        }
      },
      //时间格式化
      timeFormatter(value){
       if(value == 0 || value.length < 10){return '--';}
        let cellTime =new Date(parseInt(value) * 1000);
        let allTime = util.formatDate.format(cellTime);
        let dateTime = util.formatDate.format(cellTime).split(' ')[0];
        return dateTime;
      },
      //具体时间格式化
      alltimeFormatter(value){
       if(value == 0 || value.length < 10){return '--';}
        let cellTime =new Date(parseInt(value) * 1000);
        let allTime = util.formatDate.format(cellTime);
        let dateTime = util.formatDate.format(cellTime).split(' ')[0];
        return allTime;
      },
      //手机号码格式化 前三后四
      mobileFormatter(value){
        let _front = value.substr(0,3)
        let _behind =value.substr(7,4)
        let rtVal = _front + ' ' + '****' + ' ' + _behind;
        return rtVal;
      },
      //分期状态样式
      dividStatusClass(status){
         switch (status){
          case '1': return 'status-1' ;break;
          case '2': return 'status-2' ;break;
          case '3': return 'status-3' ;break;
          case '4': return 'status-4' ;break;
          default:break;
        }
      },
      //过程点点 样式 
      processPointClass(){
        let _status = this.status;
        let _one = _status == 1 || _status == 13 || _status == 16  || _status == 10 || _status == 12 || _status == 15;
        let _two = _status == 2 || _status == 3 || _status == 4 || _status == 5 || _status == 14|| _status == 17  || _status == 6;
        let _three = _status == 9 ;

        if(_one){
          return 'ps-point-1 ps-point';
        }
        if(_two){
          return 'ps-point-2 ps-point';
        }
        if(_three){
          return 'ps-point-3 ps-point';
        }
      },
      //背景色样式
      headerBgClass(){
         let _status = this.status;
         let _green = _status == 9 ;
         let _red =  _status == 3 || _status == 5 || _status == 12 || _status == 15 || _status == 16  || _status == 10;
         let _orange = _status == 2  || _status == 7 || _status == 8 || _status == 11 || _status == 1|| _status == 14 || _status == 4 ||_status == 17 || _status == 6;
         if(_green){
           return 'top-header header-green-bg';
         }
         if(_red){
           return 'top-header header-red-bg';
         }
         if(_orange){
           return 'top-header header-bg';
         }
      },
      //计算倒计时秒数
      calculateSecond(_overdueTime){
        //let _overdueTime = 1651872922;
        let _nowTime = Number(Date.parse(new Date()))/1000;
        console.log(_nowTime)
        let _second = _overdueTime -_nowTime;
        this.lastSecond = _second;
        console.log(this.lastSecond)
        this.calculateCountdownTime()
        
      },
      //计算还款倒计时
      calculateCountdownTime(){
        let _this = this;
        let _second,_d,_h,_m,_s; 
        let Time = setInterval(function(){
          _this.lastSecond --;
          _second = _this.lastSecond;
          if (_second >= 0) {  
            _d = Math.floor(_second / 60 / 60 / 24);  
            _h = Math.floor(_second  / 60 / 60 % 24);  
            _m = Math.floor(_second  / 60 % 60);  
            _s = Math.floor(_second  % 60);                     
          }  
          _h = _d * 24 + _h;

          _this.cdHour = isNaN(_h)?'--':_h;
          _this.cdMinute = isNaN(_m)?'--':_m;
          _this.cdSecond = isNaN(_s)?'--': _s;

        },1000)

      },
       //逾期天数
      calculateOverdueDays(_overdueTime){
        let _nowTime = Number(Date.parse(new Date()))/1000;
        let _second = _nowTime - _overdueTime ;
       
        let _d = Math.floor(_second / 60 / 60 / 24);  
        return _d;
      },

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
      //弹框倒计时
      countdownWaitting(){
        let _this = this;
        let second = 9;
        //修改发送验证码按钮
        let Time = window.setInterval(()=>{
          if(second > 0){
            _this.waittingCountdownNum = `${second}s`;
            second --;
          }
          else{
            _this.isShowWaittingAlert = false;
            _this.waittingCountdownNum = null;
            window.clearInterval(Time);
            _this.isShowSureBorrowAlert = false;
            _this.isShowSureBorrowBtn = false;
            _this.isShowSureLoan = false;
            //_this.reload();
            //_this.$router.go(0);
            _this.getMyOrderDetailRequest();
          }
        },1000);
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
      //刷新当前
      goBackThis(){
        this.isShowCurrentBill = false;
        this.isShowNeedBorrowBtn = false;
        this.isShowRepaymentBtn = false;
          this.isShowSureBorrowAlert = false;
        this.$router.push({path:'/orderInfo',query:{orderId:this.orderId}});
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
  .top-header-bg{
    background-color: #fff;
    width: 100%;
    .top-header{
      height: 2.4rem;
      text-align: center;
      padding-top: 0.8rem;
      margin: 0 0.4rem;
      margin-top: 1.32rem;
      color: #FFF;
      border-radius: 0.2rem;
      .large-font{
        font-size: 0.5rem;
        font-weight:500;
        line-height: 0.6rem;
      }
      .gap{
        height: 0.4rem;
      }
      .little-font{
        font-size: 0.36rem;
      }
      div{
        position: relative;
        .last-day{
          position: absolute;
          top: 0;
          right: 0;
          width: 4.8rem;
          height: 0.8rem;
          text-align: center;
          line-height: 0.8rem;
          background: linear-gradient(276deg, #ffcb34 0%, #ff9530 100%);
          border-radius: 1rem 0px 0px 1rem;
        }
      }
    }
    .header-bg{
      background:linear-gradient(270deg,rgba(255,203,52,1) 0%,rgba(255,149,48,1) 100%);
    }
    .header-green-bg{
      background:#2CC25D;
    }
    .header-red-bg{
      background:#FAFAFC;
      .large-font{
        color:#595656;
      }
      .little-font{
        color:#595656;
      }
      
    }
  }
  
  .wait-account-list{
   
    margin: 0 auto;
    margin-bottom: 0.4rem;
    background: #FFF;
    .wait-title{
      height: 1.4rem;
      font-size: 0.4rem;
      padding:0 0.4rem;
      line-height: 1.4rem;
      color:#1D1B1B;
      border-bottom: 1px solid #DDDDDD;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      em{
        color:#FF9530;
      }
    }
    ul{
     
     
      background: #fff;
     
      li:last-child{
        border-bottom: 0;
      }
      li{
        padding:0.4rem ;
        border-bottom: 1px solid #DDDDDD;
        p{
          height: 0.8rem;
          line-height: 0.64rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-size: 0.42rem;
          span{
            font-size: 0.38rem;
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
          border-radius: 0.4rem;
        }
      }
    }
  }
  .process{
    background: #FFF;
    height: 4.6rem;
    margin-bottom:0.4rem;
    padding:0.4rem;
    display: flex;
    flex-direction: row;
    .ps-point{
      flex:1;
      
      
      background-repeat: no-repeat;
      position: relative;
      top: 0.28rem;
      left: 0.32rem;
    }
    .ps-point-1{
      background-size:52%;
      background-image: url(../assets/images/api/pic_jindu_01@3x.png);
    }
    .ps-point-2{
       background-size:38%;
      background-image: url(../assets/images/api/pic_jindu_02@3x.png);
    }
    .ps-point-3{
      background-size:38%;
      background-image: url(../assets/images/api/pic_jindu_03@3x.png);
    }
    .ps-list{
      flex:5;
      .ps-list-item{
        margin-bottom:0.58rem;
        .list-item-title{
          color:#353333;
          font-size: 0.42rem;
          
        }
        .list-item-info{
          color:#84878A;
          font-size:0.36rem;
        }
      }
      
    }
  }
  .apply-info{
   
    background: #FFF;
    padding: 0.4rem;
    padding-top: 0.3rem;
    font-size: 0.42rem;
   
    .apply-name{
     img{
        width: 1rem;
        height: 1rem;
        margin-right: 0.2rem;
        vertical-align: middle;
        display: inline-block;
     }
     span{
      display: inline-block;
      vertical-align: middle;
      p:first-child{
        color:#1D1B1B;
        font-weight: 500;
        font-size: 0.46rem;
      }
      p:last-child{
        color:#84878A;
        
      }
     }
    }
    .apply-md{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top:0.4rem;
      div:first-child{
        margin-right:0.4rem;
      }
      div{
        width: 6rem;
       
        padding: 0.4rem 0;
        border-radius:0.2rem;
        box-shadow:0px 2px 10px 1px rgba(243,240,237,1);
        text-align: center;
        label{
          display: block;
          color:#595656;
        }
        span{
          display: block;
          color:#1D1B1B;
          font-size: 0.64rem;
          font-weight: 500;
        }
      }
    }
  }
  .list{
    background: #FFF;
    padding: 0.4rem;
    padding-top: 0.3rem;
    font-size: 0.42rem;
    .list-item{
      padding: 0.14rem 0;
      display: flex;
      flex-direction: row;
      label{
        display: inline-block;
        padding-right:0.2rem;
        min-width: 2.08rem;
        color:#A4A0AB;
      }
      span{
        color:#2D2A31;
        img{
          width: 0.64rem;
          height: 0.64rem;
          margin-right: 0.2rem;
          vertical-align: middle;
        }
        strong{
          font-weight: 400;
        }
      }
      em{
        color:#84878A;
        display: inline-block;
        margin-left: 0.2rem;
      }
    }
    
  }
  .time{
    height: 1.2rem;
    line-height: 1.2rem;
    background:#FFF ;
    color:#595656;
    padding:0 0.4rem;
    margin:0.4rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    label{
      color:#84878A;
    }
    span{
      font-size: 0.36rem;
      em{
        font-size: 0.4rem;
        color:#FF9530;
      }
      strong{
        font-weight: 400;
        color:#FFCB34;
        display: inline-block;
        margin-left:0.2rem;
      }
    }
  }
  .protocol{
    background: #fff;
    padding:0 0.4rem;
    div{
      height: 1.6rem;
     line-height: 1.6rem;
      label{
        min-width:1.8rem;
        color:#1D1B1B;
      }
      span{
        
        a{
          font-size: 0.32rem;
          color:#D8A154;
        }
      }
    }
    p{
      border:1px dashed #DDDDDD;
      border-radius:0.16rem;
      padding: 0.4rem;
    }
  }
  .bank{
     
    display: flex;
    flex-direction: row;
    background: #fff;
    margin-bottom:0.4rem;
    p:nth-of-type(1){
      padding-left: 0.6rem; 
      min-width: 3rem;
    }
    p:nth-of-type(2){
      flex: 2;
      text-align: right;
      padding-right: 0.6rem; 
    }
    p{
      height: 1.2rem;
      line-height: 1.2rem;
      flex:1;
      
      font-size: 0.36rem;
      label{
        vertical-align: middle;
        display: inline-block;
        color:#84878A;
        padding-left:1rem;
        background-size:26%;
        background-repeat: no-repeat;
        background-image: url(../assets/images/api/icon_skyhk@3x.png);
        background-position: left center;
      }
     
      span{
        vertical-align: middle;
        color:#2D2A31;
        font-weight: 500;
      }
      em{
        vertical-align: middle;
        color:#A4A0AB;
      }
      i{
        vertical-align: middle;
        display: inline-block;
        width: 1.2rem;
        height: 0.6rem;
        margin-left: 0.2rem;
        border-radius: 0.6rem;
        color: #FF9530;
        border: 1px solid #FF9530;
        text-align: center;
        line-height: 0.6rem;
        font-size: 0.32rem;
        
      }
    }
  }
  .btn{
    width: 10rem;
    height: 1.4rem;
   
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
      flex:1.5;
      background: #FAFAFC;
      color:#84878A;
      border-top:1px solid #DDD;
    }
    .dis-span{
      background:linear-gradient(90deg,#f1e4d0 0%,#e3c9a8 100%);
      color:#ac8f73;
    }
  }

  .alert-msg{
    width: 100%;
    height: 110%;
    position: fixed;
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


  .cur-bill{
    width: 9.4rem;
   
    margin:0 auto;
    margin-top:1.72rem;
    box-shadow:0px 2px 6px 1px rgba(236,236,245,1);
    
    ul{
      background-color: #fff;
      li{
        height: 1.32rem;
        border-bottom:1px dashed #DDD;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 0.44rem;
        margin: 0 0.4rem;
        label{
          color:#A4A0AB;
        }
        span{
          color:#2D2A31;
        }
        p{
          text-align: center;
          margin: 0 auto;
          width: 100%;
          background: #FAFAFC;
          padding:0.4rem 0;
        }
      }
      li:last-child{
         border-bottom:0;
      }
    }
    p{
      height: 1.2rem;
      background-color: #fff;
      color:#FF9530;
      font-size: 0.44rem;
      line-height: 0.72rem;
      margin-left: 0.4rem;
    }
  }

  .sure-loan{
    ul{
   margin-top: 1.36rem;
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
        p{
          text-align: center;
          margin: 0 auto;
          width: 100%;
          background: #FAFAFC;
          height: 1rem;
          line-height: 1rem;
        }
      
      }
    }
    .loan-protocol{
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
      margin-top: 3.6rem;
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
  

}
</style>

