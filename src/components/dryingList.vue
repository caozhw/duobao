<template>
  <div class="container">
    <div class="header">
      <a href="javascript:void(0)" @click="goBack">
        <img src="../assets/images/db/icon_back_white@2x.png" alt>
      </a>
      <span>{{title}}</span>
      <em>规则</em>
    </div>
    
    <div class="wrapper">
      <div class="lucky">
        <p>幸运儿</p>
        <div class="icon">
          <img />
          <div class="if">
            <p>137****0616</p>
            <p>1214***********8900</p>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="list three-list">
        <p class="l-line"></p>
        <p class="l-head">
          <span>领奖码</span>
          <span>领取时间</span>
        </p>
          <ul>
            <li>
              <span>10001234</span>
              <span>2019/07/18 20:07:52</span>
            </li>
            <li>
              <span>10001234</span>
              <span>2019/07/18 20:07:52</span>
            </li>
            <li>
              <span>10001234</span>
              <span>2019/07/18 20:07:52</span>
            </li>
            <li>
              <span>10001234</span>
              <span>2019/07/18 20:07:52</span>
            </li>
            <li>
              <span>10001234</span>
              <span>2019/07/18 20:07:52</span>
            </li>
            <li>
              <span>10001234</span>
              <span>2019/07/18 20:07:52</span>
            </li>
          </ul>
      </div>
      <!-- 获奖感言 -->
      <div class="title">
        <span>
          <i></i>
          <em>获奖感言</em>
        </span>
        
      </div>
      <div class="recollections">发表中.....</div>
      <!-- 照片 -->
      <div class="title">
       <span>
          <i></i>
          <em>照片</em>
        </span>
       
      </div>
      <div class="photo">
        <img />
        <img />
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
          title:'0元夺宝晒单',

          selsectIndex:'30',// 10 活动规则 11本期领奖码 20参与记录 30我的领奖码
          isIng:false,//是否进行中
        

         
          
        }
    },
    computed:{

      
    },
    mounted() {
  
    
    },
    methods: {

     
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
   .wrapper{
    margin-top: 1.4rem;
    .lucky{
      height: 2rem;
      padding:0.4rem;
      background-image:url(../assets/images/db/pic_dt@3x.png);
      background-size:100%;
      background-repeat:no-repeat;
      p{
        font-size:0.32rem;
        color:#62431D;
        font-weight: 500;
        
      }
      .icon{
        margin-top:0.2rem;
        display: flex;
        align-items: center;
        img{
          width: 1.6rem;
          height: 1.6rem;
          border-radius:50%;
        }
        .if{
          margin-left:0.2rem;
          p:nth-of-type(1){
            font-size:0.4rem;
            background-image:linear-gradient(90deg, rgba(245,71,59,1) 0%, rgba(255,178,127,1) 100%);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
          }
          p:nth-of-type(2){
            margin-top:0.2rem;
            font-size:0.3rem;
            color:#62431D;
          }

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
          height: 0.62rem;
          width: 0.1rem;
          background-image:url(../assets/images/db/pic_zs@3x.png);
          background-size:100%;
          background-repeat:no-repeat;
        }
        em{
          display: inline-block;
          font-size:0.36rem;
          color:#987C52;
          margin-left:0.24rem;
        }
      }
    }

    .list{
      margin-top:0.4rem;
      padding-bottom:0.8rem;
      .l-head{
        padding:0 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          display: inline-block;
          height: 0.8rem;
          line-height: 0.8rem;
          color: #987C52;
          font-size:0.32rem;
          text-align: center;
          
        }
         span:nth-of-type(1){
         width: 2rem;
        }
         span:nth-of-type(2){
          width: 5rem;
          text-align: right;
        }
      }
      .l-line{
        height:2px;
        background:#FCF4E0;
      }
      ul{
        height: 7.5rem;
        overflow: scroll;
        li{
          padding:0.2rem 0.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom:1px solid #E3E3E3;
          span{
            display: inline-block;
            height: 1rem;
            
            text-align: center;
            color: #62431D;
            font-size:0.34rem;
            margin-left:0.12rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            em{

            }
            i{
              font-size: 0.32rem;
              color:#C3AB8D;
            }

            
          }
          span:nth-of-type(1){
            width: 2rem;
            margin-left:0;
          }
          span:nth-of-type(2){
            width: 5rem;
            align-items: flex-end;
          }
        }
      }
    }
    .recollections{
      margin:0.4rem;
      height: 3rem;
      background: #FFFCF6;
      color:#987C52;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .photo{
       margin:0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: 4.4rem;
        height: 2.8rem;
      }
    }
  }
    
}
</style>

