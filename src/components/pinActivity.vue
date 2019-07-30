<template>
  <div class="container">
    <div class="header">
      <!-- <a href="javascript:void(0)" @click="goBack"> 
        <img src="../assets/images/icon_back_white.png" alt>
      </a>-->
      <span>{{title}}</span>
      <em>参与记录</em>
    </div>

    <div class="wrapper">
      <!-- 抽奖机会 -->
      <div class="chance">
        <p>
          <label>当前抽奖机会：</label>
          <strong>20次</strong>
          <label>(整场通用)</label>
        </p>
        <p>
          <span>邀好友 加次数</span>
        </p>
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <p>
          <i></i>
          <span>天天领现金</span>
        </p>
         <p @click="handleZeroClick">
          <i></i>
          <span>0元夺宝</span>
        </p>
         <p>
          <i></i>
          <span>砍价免费拿</span>
        </p>
         <p>
          <i></i>
          <span>试试手气</span>
        </p>
      </div>
      <!-- 0元夺宝 -->
      <div class="title">
        <span>
          <i></i>
          <em class="z-t"></em>
        </span>
        <span>更多夺宝 晒单></span>
      </div>
      <!-- 滑动 -->

      <swiper :options="swiperOption" ref="mySwiper" class="z-swiper">
           
            <swiper-slide class="zero">
              <span class="join-people">
                <label>参与人数</label>
                <em>11688</em>
              </span>
              <div class="goods">
                <img src="" />
                <div class="g-info">
                  <strong>Apple/苹果 iPhone Xs Max</strong>
                  <span>全网通4G手机双卡双待苹果</span>
                  <div class="g-btn">
                    <span class="code">立即领码</span>
                    <span class="ask">邀好友加次数</span>
                  </div>

                </div>
              </div>
              <div class="prograss">
                <span class="p-in"></span>
              </div>
              <div class="p-num">
                <span>当前进度 <em>3201</em>/18880</span>
              </div>
            </swiper-slide>
             <swiper-slide class="zero">
              slider2
            </swiper-slide>
             <swiper-slide class="zero">
              slider3
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      
      <!-- <div class="z-swiper">
        <div class="zero">
          <span class="join-people">
            <label>参与人数</label>
            <em>11688</em>
          </span>
          <div class="goods">
            <img src="" />
            <div class="g-info">
              <strong>Apple/苹果 iPhone Xs Max</strong>
              <span>全网通4G手机双卡双待苹果</span>
              <div class="g-btn">
                <span class="code">立即领码</span>
                <span class="ask">邀好友加次数</span>
              </div>

            </div>
          </div>
          <div class="prograss">
            <span class="p-in"></span>
          </div>
          <div class="p-num">
            <span>当前进度 <em>3201</em>/18880</span>
          </div>

        </div>

      </div> -->
      <!-- 用户列表 -->
      <div class="list">
        <p class="l-head">
          <span>用户手机</span>
          <span>领奖码</span>
          <span>参与次数</span>
          <span>时间</span>
        </p>
        <p class="l-line"></p>
        <ul>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>19.10.23 22:12:04</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>19.10.23 22:12:04</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>19.10.23 22:12:04</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>19.10.23 22:12:04</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>19.10.23 22:12:04</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>19.10.23 22:12:04</span>
          </li>
        </ul>
      </div>
      <!-- 开通会员 -->
      <div class="free">
        <i></i>
      </div>
      <!-- 砍价免费拿 -->
      <div class="title">
        <span>
          <i></i>
          <em class="k-t"></em>
        </span>
        <span>更多免费拿></span>
      </div>
      <!-- 继续砍价 -->
      <div class="abate-price">
        <div class='k-head'>

        </div>
        <div class="k-b">
          <ul class="good-list">
            <li>
              <div class="good-img">
                <img src="" />
                <span>原价：¥8888.00</span>
              </div>
              <div class="good-info">
                <strong>【iPhone Xs Max】Apple/苹果 64G全网通手机双卡双待…</strong>
                <div class="k-num">
                  <div class="k-ps">
                    <p>已砍<em>213.12</em>还差<em>1000.00</em></p>
                    <div class="prograss">
                      <span class="p-in"></span>
                    </div>
                  </div>
                  <div class="k-btn">继续砍价 </div>
                </div>
              </div>
            </li>

            <li>
              <div class="good-img">
                <img src="" />
                <span>原价：¥8888.00</span>
              </div>
              <div class="good-info">
                <strong>【iPhone Xs Max】Apple/苹果 64G全网通手机双卡双待…</strong>
                <div class="k-num">
                  <div class="k-ps">
                    <p>已砍<em>213.12</em>还差<em>1000.00</em></p>
                    <div class="prograss">
                      <span class="p-in"></span>
                    </div>
                  </div>
                  <div class="k-btn">继续砍价 </div>
                </div>
              </div>
            </li>

            
          </ul>

        </div>

        <div class="k-b" style="border:0">
          <ul class="good-list">
            <li>
              <div class="good-img">
                <img src="" />
                <span>原价：¥8888.00</span>
              </div>
              <div class="good-info">
                <strong>【iPhone Xs Max】Apple/苹果 64G全网通手机双卡双待…</strong>
                <div class="k-num">
                  <div class="k-ps">
                    <p>已送出<em>200</em>件</p>
                    
                  </div>
                  <div class="k-btn">砍价免费拿  </div>
                </div>
              </div>
            </li>

            <li>
              <div class="good-img">
                <img src="" />
                <span>原价：¥8888.00</span>
              </div>
              <div class="good-info">
                <strong>【iPhone Xs Max】Apple/苹果 64G全网通手机双卡双待…</strong>
                <div class="k-num">
                  <div class="k-ps">
                    <p>已送出<em>200</em>件</p>
                    
                  </div>
                  <div class="k-btn">砍价免费拿  </div>
                </div>
              </div>
            </li>

            
          </ul>

        </div>

        

      </div>
      <!-- 30元现金红包 -->
      <div class="time">
        <div class="tm">
          <span>00</span>
          <em>:</em>
          <span>20</span>
          <em>:</em>
          <span>34</span>
        </div>
        <div class="top">
          <i></i>
          <span>（上不封顶）</span>
          <div class="l-btn"></div>
        </div>
      </div>

      <!-- 显示抽奖 -->
       <div class="title" style="justify-content: left;">
        <span>
          <i></i>
          <em class="k-c"></em>
        </span>
        <span style="margin-left:0.12rem;">剩余2次</span>
      </div>
      <div class="award">
        <div class="blank">
          <p v-for="(item,index) in LuckDrawList" 
            :key="index" 
            :class="activeAwardIndex==item.awardIndex?'active':''" 
            @click="handleLuckDrawClick(item)">
            <img :src="item.img" />
            <span>{{item.name}}</span>
          </p>
          <!-- <p>
            <img src="" />
            <span>电动滑板车</span>
          </p>
          <p>
            <img src="" />
            <span>电动滑板车</span>
          </p>
          <p>
            <img src="" />
            <span>电动滑板车</span>
          </p>
         
          <p @click="handleLuckDrawClick">
            <img src="../assets/images/db/pic_ljcj@3x.png" />
            <span>剩余次数：20</span>
          </p>
          <p>
            <img src="" />
            <span>电动滑板车</span>
          </p>
          <p>
            <img src="" />
            <span>电动滑板车</span>
          </p>
          <p>
            <img src="" />
            <span>电动滑板车</span>
          </p>
          <p>
            <img src="" />
            <span>电动滑板车</span>
          </p> -->
        </div>

        <div class="a-btn"></div>
        


      </div>
      <!-- <div class="chance">34242343</div>
      <div class="chance">34242343</div>
      <div class="chance">34242343</div> -->
      <!-- 弹幕 -->

    </div>

    
  </div>
</template>
<script>
import { mapState } from 'vuex'
import flexible from '../axios/js/flexible.js'
import {sendRequest_app, getSignParamFromApp, openAppNativeView, goBackPage,controlTime} from '@/axios/axios_vue';
import {autoSign,homeList} from '@/axios/axios_vue';
import {AndroidOrIos} from '../axios/js/judge.js';
import util from '../axios/js/util.js';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
let luckDrawBtn = require('../assets/images/db/pic_ljcj@3x.png');
export default {
    name:'',
    components: {
      swiper,
      swiperSlide
    },
    data () {
        return { 
          title:'金享会赚钱专区',

          //抽奖
          activeAwardIndex:0,//抽奖选中的商品序号
          LuckDrawRemainNum:5,//抽奖剩余次数

          mustAwardIndex:1,//要求选中的商品序号

          swiperOption: { //swiper插件配置
            // some swiper options/callbacks
            // 所有的参数同 swiper 官方 api 参数
            // ...
           
            loop:true,
            init:true,
            pagination: {
              el: '.swiper-pagination'
            },
            observeParents:true,
            observer:true,
          },


          LuckDrawList:[
            {id:0,img:'',name:'电动滑板车'},
            {id:1,img:'',name:'电动滑板车'},
            {id:2,img:'',name:'电动滑板车'},
            {id:3,img:'',name:'电动滑板车'},
            {id:4,img:'',name:'电动滑板车'},
            {id:5,img:'',name:'电动滑板车'},
            {id:6,img:'',name:'电动滑板车'},
            {id:7,img:'',name:'电动滑板车'}
          ],


           testAppData:{
            // appKey:"android_user",
            // uuid:"3072562a-69d5-490c-939e-fc0a562787f8",
            // sessionId:"a34056eea8741ea56fe0c884bcabb717",
            // source:"JxhOfficial",
          },



         
          
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    updated(){
      this.swiper.init();
    },
    created(){
      this.insertBtnInAward();

    },
    mounted() {
    this.homeListRequest();
          
    },
    methods: {
      //18.1首页夺宝列表|PreData
      homeListRequest(){
        // //测试数据
        let newObj = this.testAppData;
     
        newObj.sign = autoSign(newObj)

        //调用
        // var obj = new Object();
        // obj.productId = this.productId;
        // obj.productOrderId = this.productOrderId;
        // var appReturnStr = getSignParamFromApp(obj);
        // let newObj = JSON.parse(appReturnStr);
        // let obj_str = JSON.stringify(newObj)
        //alert(obj_str)
        sendRequest_app(homeList, newObj).then((res) => {
          let {code,msg,result} = res;
           //alert(code)
          // alert(msg)
          if(code == "00"){
           
        //alert(obj_str)
          }else{
            this.toastShowHide(msg,'bottom',2000);
            //this.$router.push({path:'/error'});
          }
        });
      },

      //立即抽奖
      handleLuckDrawClick(item){
        let _Time = null;
        let _this = this;
        if(item.awardIndex==0){
          _this.LuckDrawRemainNum --;
         
          _this.LuckDrawList[4].name = '剩余次数：'+_this.LuckDrawRemainNum;
          _Time = setInterval(()=>{
            _this.activeAwardIndex++;
            if(_this.activeAwardIndex>8){
              _this.activeAwardIndex=1;
            }
          },100);

          let _timeout = setTimeout(()=>{
              clearInterval(_Time);
              _Time = null;
              let _endTime = setInterval(()=>{
                if(_this.activeAwardIndex>_this.mustAwardIndex || _this.activeAwardIndex<_this.mustAwardIndex){
                  _this.activeAwardIndex++;
                  if(_this.activeAwardIndex>8){
                    _this.activeAwardIndex=1;
                  }
                }else{
                  clearInterval(_endTime);
                  _endTime = null;
                  clearTimeout(_timeout);
                  _timeout = null;
                }
              },300);
            //_this.activeAwardIndex = _this.mustAwardIndex;
            

          },5000)

        }
      },

      //将抽奖按钮插入到数据
      insertBtnInAward(){
        let _num = '剩余次数：'+this.LuckDrawRemainNum;
        let _btn = {id:999,img:luckDrawBtn,name:_num}
        this.LuckDrawList.splice(4,0,_btn);
        let _awardIndex = [1,2,3,8,0,4,7,6,5];//奖品旋转顺序
        for(let i = 0;i<_awardIndex.length;i++){
          this.LuckDrawList[i].awardIndex = _awardIndex[i];
        }
      },

      //0元夺宝
      handleZeroClick(){
        this.$router.push({path:'treasure'})
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
  background: #FFF;
 
  font-family:PingFangSC-Regular;
  font-weight:400;
  
  .header {
    font-family:PingFangSC-Medium;
    width: 100%;
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
      position: relative;
    left: 0.4rem;
    }
    em{
      display: inline-block;
      font-size:0.32rem;
      vertical-align: middle;
      float: right;
      position: relative;
      left: -0.8rem;
      color: #1d1b1b;

    }
  }
  .wrapper{
    margin-top: 1.4rem;
    .chance{
      padding:0 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow:0px 4px 8px 1px rgba(243,243,243,1);
      p{
        color:#DDA462;
        margin:0.2rem 0;
        label{
          font-size: 0.38rem;
        }
        strong{
          font-size: 0.4rem;
        }
        span{
          display: inline-block;
          font-size: 0.38rem;
          padding:0.12rem;
          border-radius:0.08rem;
          border:1px solid #DDA462;
        }
      }
    }
    .btn{
      padding:0 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin:0.4rem 0;
      padding-bottom:0.2rem;
      p{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        i{
          display: inline-block;
          width: 1.2rem;
          height: 1.2rem;
          background-size:100%;
          background-repeat:no-repeat;
          margin-bottom:0.16rem;

        }
        span{
          color:#62431D;
          font-size:0.36rem;
        }
      }
      p:nth-of-type(1){
        i{
          background-image:url(../assets/images/db/icon_lhb@3x.png);
        }
      }
      p:nth-of-type(2){
        i{
          background-image:url(../assets/images/db/icon_db@3x.png);
        }
      }
      p:nth-of-type(3){
        i{
          background-image:url(../assets/images/db/icon_mfn@3x.png);
        }
      }
      p:nth-of-type(4){
        i{
          background-image:url(../assets/images/db/icon_ssq@3x.png);
        }
      }
    }
    .title{
      padding:0 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin:0.4rem 0;
      span{
        display: flex;
        align-items: center;
        i{
          display: inline-block;
          height: 0.68rem;
          width: 0.12rem;
          background-image:url(../assets/images/db/pic_zs@3x.png);
          background-size:100%;
          background-repeat:no-repeat;
        }
        em{
          display: inline-block;
          height: 0.68rem;
          width: 2rem;
          background-size:100%;
          background-repeat:no-repeat;
          background-position: 0 center;
          margin-left:0.24rem;
        }
        .z-t{
          background-image:url(../assets/images/db/pic_dbwz@3x.png);
        }
        .k-t{
          width: 2.6rem;
          background-image:url(../assets/images/db/pic_mfn@3x.png);
        }
        .k-c{
          background-image:url(../assets/images/db/pic_cj@3x.png);
        }
      }
      span:nth-of-type(2){
        font-size:0.36rem;
        color:#987C52;
      }
    }
     .prograss{
        width: 100%;
        height: 0.24rem;
        background: #FFE8BE;
        border-radius: 0.12rem;
        margin-top: 0.24rem;
        .p-in{
          width: 20%;
          height: 100%;
          display: block;
          border-radius: 0.12rem;
          background: linear-gradient(90deg,rgba(255,211,120,1) 0%,rgba(255,155,54,1) 100%);
        }
      }
    .z-swiper{
      .zero{
        height: 4.2rem;
        background-image:url(../assets/images/db/pic_dt@3x.png);
        background-size:100%;
        background-repeat:no-repeat;
        padding: 0.12rem 0.4rem;
        position: relative;
        .join-people{
          display: inline-block;
          width: 1.78rem;
          height: 1.24rem;
          padding-top: 0.12rem;
          background-image:url(../assets/images/db/pic_xz@3x.png);
          background-size:100%;
          background-repeat:no-repeat;
          text-align: center;
          position: absolute;
          top:-1px;
          right: 0.4rem;
          color:#9A6F3A;
          label{
            font-size: 0.32rem;
          }
          em{
            font-size: 0.36rem;
            font-weight: 500;
          }
        }
      }
      .goods{
        display: flex;
        align-items: center;
        margin-top: 0.48rem;
        img{
          width: 2.4rem;
          height: 2.4rem;
          border:1px solid #FDECD9;
        }
        .g-info{
          display: flex;
          flex-direction: column;
          margin-left:0.32rem;
          strong{
            font-size:0.38rem;
            color:#62431D;
          }
          span{
            font-size:0.34rem;
            color:#62431D;
          }
          .g-btn{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top:0.4rem;
           span{
             display: inline-block;
             width: 2.32rem;
             padding:0.2rem;
             border-radius: 0.8rem;
             border:1px solid #F64C3F;
             text-align: center;
           }
           .code{
             background:#F45A46;
             color:#FFF;
             
           }
           .ask{
             color:#F64C3F;
             margin-left:0.2rem;
           }
          }
        }
      }
      .p-num{
        span{
          font-size: 0.38rem;
          color:#8E8E8E;
          em{
            color:#F65242;
          }
        }
        
      }
    }
    .list{
      
      .l-head{
        padding:0 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          display: inline-block;
          height: 1.2rem;
          line-height: 1.2rem;
          text-align: left;
          color: #987C52;
          font-size:0.42rem;
          
        }
         span:nth-of-type(1){
          flex:2;
        }
         span:nth-of-type(2){
          flex:1;
        }
         span:nth-of-type(3){
          flex:2;
          text-align: center;
        }
        span:nth-of-type(4){
          flex:2;
          text-align: right;
        }
      }
      .l-line{
        height:2px;
        background:linear-gradient(95deg,rgba(220,163,96,1) 0%,rgba(254,224,187,1) 100%);
        opacity:0.3231;
      }
      ul{
        height: 3rem;
        overflow: scroll;
        li{
          padding:0 0.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span{
            display: inline-block;
            height: 1rem;
            line-height: 1rem;
            text-align: left;
            color: #62431D;
            font-size:0.38rem;
            margin-left:0.12rem;
            
          }
          span:nth-of-type(1){
            flex:2;
            margin-left:0;
          }
          span:nth-of-type(2){
            flex:1;
          }
          span:nth-of-type(3){
            flex:2;
            text-align: center;
          }
          span:nth-of-type(4){
            flex:5;
          }
        }
      }
    }
    .free{
      margin:0 0.4rem;
      margin-top:0.42rem;
      width: 9.2rem;
      height: 1.6rem;
      background-image:url(../assets/images/db/pic_ggtm@3x.png);
      background-size:100%;
      background-repeat:no-repeat;
      position: relative;
      i{
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        background-image:url(../assets/images/db/pic_anniu@3x.png);
        background-size:100%;
        background-repeat:no-repeat;
        position: absolute;
        top: 0.08rem;
        right: 0.12rem;
        
      }
    }
    .abate-price{
      padding:0 0.4rem;
      .k-head{
        height: 0.9rem;
        background-image:url(../assets/images/db/pic_jxz@3x.png);
        background-size:100%;
        background-repeat:no-repeat;
        
      }
      .k-b{
        padding:0.32rem;
        border:1px solid #FFC458;
        border-top:0;
        border-radius:0 0 0.08rem 0.08rem;

        .good-list{
          li{
            display: flex;
            padding:0.4rem 0;
            
            .good-img{
              width: 5.8rem;
              display: flex;
              flex-direction: column;
              img{
                width: 100%;
                height: 2rem;
                border:1px solid #FDECD9;
              }
              span{
                padding:0.12rem;
                background: #FFF6EB;
                font-size: 0.34rem;
                color:#62431D;
                border-radius:0.08rem;
              }
            }
            .good-info{
              margin-left:0.2rem;
              strong{
                display: block;
                font-size:0.38rem;
                color:#62431D;
              }
              .k-num{
                margin-top:0.78rem;
                display: flex;
                align-items: flex-end;
                height: 0.68rem;
                .k-ps{
                  flex:2.5;
                  font-size:0.32rem;
                  color:#8E8E8E;
                  em{
                    color:#F45A46;
                  }
                }
                .k-btn{
                  display: flex;
                  align-items: center;
                  color:#FFF;
                  background: #F64C3E;
                  border-radius:0.8rem;
                  padding:0.2rem;
                  margin-left:0.2rem;
                  
                }
              }
            }
          }
        }
      }
    }
    .time{
      height: 2.4rem;
      padding-left: 3rem;
      background-image:url(../assets/images/db/pic_dt@3x.png);
      background-size:100%;
      background-repeat:no-repeat;
      display: flex;
     
      justify-content: center;
      flex-direction: column;
      .tm{
        span{
          display: inline-block;
          width: 0.8rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          background: #DCC199;
          color:#FFF;
          font-size:0.36rem;
         
         
        }
        em{
          display: inline-block;
          margin:0 0.2rem;
        }
      }
      .top{
        margin-top:0.2rem;
        display: flex;
        align-items: center;
        i{
          display: inline-block;
          width: 2.6rem;
          height: 0.4rem;
          background-image:url(../assets/images/db/pic_hbz@3x.png);
          background-size:100%;
          background-repeat:no-repeat;
        }
        span{
          color:#987C52;
          font-size: 0.26rem;
        }
        .l-btn{
          width: 1.6rem;
          height: 0.8rem;
          background-image:url(../assets/images/db/btn_lq@2x.png);
          background-size:100%;
          background-repeat:no-repeat;
        }
        
      }

    }
    .award{
      margin: 0 0.4rem;
      margin-bottom: 1rem;
      width: 8.4rem;
      height: 10rem;
      background-image:url(../assets/images/db/pic_zp_db@3x.png);
      background-size:100%;
      background-repeat:no-repeat;
      padding:0.4rem;
      .blank{
        padding:0.12rem;
        padding-top: 0.06rem;
        padding-left: 0.14rem;
        display: flex;
        flex-wrap: wrap ;
        align-items: center;
        justify-content:space-between;
        p.active{
          background-image:url(../assets/images/db/pic_zp_xz@3x.png);
        }
        p{
          width:2.64rem;
          height: 2.4rem;
          background-image:url(../assets/images/db/pic_xfk@3x.png);
          background-size:100%;
          background-repeat:no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img{
            width: 2rem;
            height: 1.2rem;
          }
          span{
            font-size: 0.3rem;
            color:#4D3107;
          }
        }
        p:nth-of-type(5){
          background-image:url(../assets/images/db/pic_xfk_h@3x.png);
          
          img{
            height: 0.6rem;
          }
          span{
            color:#FFFFFF;
          }
        }
      }
      .a-btn{
        width: 4rem;
        height: 1.2rem;
        margin: 0 auto;
        background-image:url(../assets/images/db/pic_btn_zjcs@3x.png);
        background-size:100%;
        background-repeat:no-repeat;
        position: relative;
        top: 0.6rem;
      }
      
    }
  }


}
</style>
<style>
.z-swiper /deep/ .swiper-pagination-bullet{
      width:0.18rem;
      height:0.18rem;
      background:#EBC18F;
      border-radius:50%;
    }
    .z-swiper /deep/ .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
      bottom: 0.04rem;
    }  
</style>



