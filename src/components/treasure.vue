<template>
  <div class="container">
    <div class="header">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/db/icon_back_white@2x.png" alt>
      </a>
      <span>{{title}}</span>
       <em>规则</em>
    </div>


    <div class="z-swiper">
      <div class="zero">
        <i class="ing"></i>
        <p class="q-num">第9期</p>
        <div class="goods">
          <div class="good-img">
            <img src="" />
            <span>原价：¥8888.00</span>
          </div>
          <div class="g-info">
            <strong>Apple/苹果 iPhone Xs Max64G 全网通4G手机双卡双待苹果… </strong>
            <span><em>13880</em>人参加</span>
            <div class="g-btn">
              <span class="code">立即领码</span>
              <!-- <span class="ask">邀好友加次数</span> -->
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

      <div class="zero">
        <i class="end"></i>
        <p class="q-num">第8期</p>
        <div class="goods">
          <div class="good-img">
            <img src="" />
            <span>原价：¥8888.00</span>
          </div>
          <div class="g-info">
            <strong>Apple/苹果 iPhone Xs Max64G 全网通4G手机双卡双待苹果… </strong>
            <span><em>13880</em>人参加</span>
            <div class="g-btn">
              <!-- <span class="code">立即领码</span> -->
              <span class="ask" @click="handleInfoClick">查看记录</span>
            </div>
          </div>
        </div>
        <!-- <div class="prograss">
          <span class="p-in"></span>
        </div> -->
        <div class="award-code">
          <div class="code">
            <strong>领奖码</strong>
            <span>66808468</span>
          </div>
          <div class="a-people">
            <p>恭喜 159****3888 身份证12156***112806 王**获得本期大奖</p>
            <em>2019.11.28 23:30揭晓</em>
          </div>
        </div>
        <!-- <div class="p-num">
          <span>当前进度 <em>3201</em>/18880</span>
        </div> -->

      </div>
    </div>
  
  </div>
</template>
<script>
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
          title:'0元夺宝',
        

         
          
        }
    },
    computed:{

      
    },
    mounted() {
  
    
    },
    methods: {

      //查看详情 点击
      handleInfoClick(){
        this.$router.push({path:'treasureInfo'})
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

    .prograss{
      
      height: 0.16rem;
      background: #F4E4DD;
      border-radius: 0.12rem;
      margin:0 0.4rem;
      margin-top: 0.24rem;
      margin-bottom: 0.12rem;
      .p-in{
        width: 20%;
        height: 100%;
        display: block;
        border-radius: 0.12rem;
        background:linear-gradient(90deg,rgba(245,71,59,1) 0%,rgba(255,178,127,1) 100%);
      }
    }

   .z-swiper{
      .zero{
        height: 4.2rem;
       
        background:#fff;
        padding: 0.12rem 0;
        
        position: relative;
        margin-top:1rem;
        i{
          display: inline-block;
          position: absolute;
          top:0;
          right: 0;
          width: 1.6rem;
          height: 1.6rem;
         
          background-size:100%;
          background-repeat:no-repeat;
        }
        i.ing{
           background-image:url(../assets/images/db/pic_kjz@3x.png);
        }
        i.end{
           background-image:url(../assets/images/db/pic_ycj@3x.png);
        }
        .q-num{
          font-size:0.36rem;
          color:#62431D;
          margin: 0.32rem 0;
           padding: 0 0.4rem;
        }
        .goods{
          display: flex;
          align-items: center;
          padding: 0 0.4rem;
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
              color:#987C52;
              em{
                color:#F54D3E;
              }
            }
            .g-btn{
              display: flex;
              align-items: center;
              justify-content: flex-end;
              margin-top:0.2rem;
            span{
              display: inline-block;
              width: 2.32rem;
              padding:0.2rem;
              border-radius:0.8rem;
              
              text-align: center;
            }
            .code{
              background:linear-gradient(90deg,rgba(245,71,59,1) 0%,rgba(255,178,127,1) 100%);
              color:#FFF;
              
            }
            .ask{
              color:#62431D;
              border:1px solid #979797;
              margin-left:0.2rem;
            }
            }
          }
        }
        
      }
     
      .p-num{
        padding: 0 0.4rem;
        span{
          font-size: 0.38rem;
          color:#8E8E8E;
          em{
            color:#F65242;
          }
        } 
      }
      .award-code{
        
        padding:0.2rem 0.4rem;
        margin-top:0.2rem;
        background: #FFF9F0;
        color:#62431D;
        display: flex;
        align-items: center;
        .code{
          width: 3.8rem;
          height: 1.8rem;
          background-image:url(../assets/images/db/pic_ljb@3x.png);
          background-size:100%;
          background-repeat:no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          strong{
            font-size:0.32rem;
            font-weight:400;
          }
          span{
            font-size:0.32rem;
            font-weight:300;
          }
        }
        .a-people{
          margin-left:0.2rem;
          p{
            font-size:0.32rem;
            font-weight:300;
            color:#62431D;
          }
          em{
            color:#F7604B;
            float: right;
          }
        }
      }
    }
  
    
  

}
</style>

