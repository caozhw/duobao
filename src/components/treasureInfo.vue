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
        <i :class="isIng?'ing':'end'"></i>
        <div class="goods">
          <div class="good-img">
            <img src="" />
          </div>
          <div class="g-info">
            <strong>Apple/苹果 iPhone Xs Max64G 全网通4G手机双卡双待苹果… </strong>
            <span><em>13880</em>人参加</span>
            <div class="g-btn">
              <span class="code" v-if="isIng">立即领码</span>
            </div>
          </div>
        </div>
        <div class="prograss">
          <span class="p-in"></span>
        </div>
        <div class="p-num">
          <span>当前进度 <em>3201</em>/18880</span>
        </div>
        <div class="award-code" v-if="!isIng">
          <div class="code">
            <strong>领奖码</strong>
            <span>66808468</span>
          </div>
          <div class="a-people">
            <p>恭喜 159****3888 身份证12156***112806 王**获得本期大奖</p>
            <em @click="handleDringListClick">查看晒单>></em>
          </div>
        </div>
        <!-- <div class="p-num">
          <span>当前进度 <em>3201</em>/18880</span>
        </div> -->

      </div>
    </div>

    <div class="select">
      <p :class="selsectIndex==10||selsectIndex==11?'active':''">
        <span v-if="isIng">
          <em>活动规则</em>
          <i></i>
        </span>

        <span v-if="!isIng">
          <em>本期领奖码</em>
          <i></i>
        </span>
      </p>
      <p :class="selsectIndex==20?'active':''">
        <span>
          <em>参与记录</em>
          <i></i>
        </span>
      </p>
      <p :class="selsectIndex==30?'active':''">
        <span>
          <em>我的领奖码</em>
          <i></i>
        </span>
      </p>
    </div>
    <div class="example" v-if="selsectIndex==10||selsectIndex==11">
      <p class="bb-award" v-if="isIng">宝贝价值<em>8888.12</em>元，将向用户发送<em>8888</em>个领奖码，领奖码从<em>100001-108888</em>，一人可领多个号码，号码发完后即开奖。平台将以公平公正的方式产生领奖码并公示，持有幸运号码的幸运用户即可0元获得宝贝。 </p>
      <p  class="calculate" v-if="isIng">领奖码计算方式如下：</p>
      <div class="img_title" v-if="isIng"></div>
      <div class="formula">
        <div class="f-b fa">
          <div class="f_one">
            
            <span><em v-if="!isIng">本期</em>幸运号码</span>
          </div>
        </div>
        
        <div class="f_two">=</div>
        <div class="f-b fb">
          <div class="f_one">
            <p>最后50个</p>
            <span>参与时间求和</span>
          </div>
        </div>
        <div class="f_two">%</div>
        <div class="f-b fb">
          <div class="f_one">
            <p>参与总人数</p>
          </div>
        </div>
        <div class="f_two">+</div>
        <div class="f-b fb">
          <div class="f_one">
            <p>100001</p>
            <span>初始码</span>
          </div>
        </div>
      </div>
      <div class="content">
        <p>1.求和：325056284（下方50条参与记录的时间取值相加） </p>
        <p>2.求余：（325056284）%1499（商品所需人次）=1132（余数） </p>
        <p>3.1132（余数）+100001 = 101133（幸运号码）</p>
      </div>
      <p class="ex-data" v-if="isIng">以下50条数据为示例数据</p>
    </div>
    <div class="one-list list" v-if="selsectIndex==10||selsectIndex==11">
      <p class="l-line"></p>
      <p class="l-head">
        <span>用户手机</span>
       
        <span>领取时间</span>
      </p>
      <!-- <p class="l-line"></p> -->
      <ul>
        <li>
          <span>159****8809</span>
         
          <span><em>2019/07/18 20:07:52.123 </em><i>时间取值：123987688 </i></span>
        </li>
         <li>
          <span>159****8809</span>
         
          <span><em>2019/07/18 20:07:52.123 </em><i>时间取值：123987688 </i></span>
        </li>
         <li>
          <span>159****8809</span>
         
          <span><em>2019/07/18 20:07:52.123 </em><i>时间取值：123987688 </i></span>
        </li>
        <li>
          <span>159****8809</span>
         
          <span><em>2019/07/18 20:07:52.123 </em><i>时间取值：123987688 </i></span>
        </li>
         <li>
          <span>159****8809</span>
         
          <span><em>2019/07/18 20:07:52.123 </em><i>时间取值：123987688 </i></span>
        </li>
         <li>
          <span>159****8809</span>
         
          <span><em>2019/07/18 20:07:52.123 </em><i>时间取值：123987688 </i></span>
        </li>
        

      </ul>
      

    </div>
    <div class="list two-list" v-if="selsectIndex==20">
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
            <span>07/18 20:07:52</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>07/18 20:07:52</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>07/18 20:07:52</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>07/18 20:07:52</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>07/18 20:07:52</span>
          </li>
          <li>
            <span>159****8809</span>
            <span>100124567</span>
            <span>4</span>
            <span>07/18 20:07:52</span>
          </li>
        </ul>
    </div>
    <div class="list three-list" v-if="selsectIndex==30">
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
          title:'0元夺宝详情',

          selsectIndex:'30',// 10 活动规则 11本期领奖码 20参与记录 30我的领奖码
          isIng:false,//是否进行中
        

         
          
        }
    },
    computed:{

      
    },
    mounted() {
  
    
    },
    methods: {

      //查看晒单
      handleDringListClick(){
        this.$router.push({path:'dryingList'})
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
      
      height: 0.24rem;
      background: #FFE8BE;
      border-radius: 0.12rem;
      margin:0 0.4rem;
      margin-top: 0.24rem;
      margin-bottom: 0.12rem;
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
        background:#fff;
        padding: 0.12rem 0;
        background-size:100%;
       
        background-image:url(../assets/images/db/pic_dt@3x.png);
        
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
          padding-top: 0.8rem;
          .good-img{
            width: 5.8rem;
            display: flex;
            flex-direction: column;
            img{
              width: 100%;
              height: 2.8rem;
              border:1px solid #FDECD9;
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
              background:#F54D3E;
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
        margin: 0 0.4rem;
        padding-bottom:0.2rem;
       
        
        span{
          font-size: 0.38rem;
          color:#8E8E8E;
          em{
            color:#F65242;
          }
        } 
      }
      .award-code{
        border-top:1px solid #DCC199;
        margin: 0 0.4rem;
        padding:0.2rem 0;
        
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

    .select{
      padding-top: 0.4rem;
      padding-left:0.48rem;
      padding-right:0.8rem;
      box-shadow:0px 4px 8px 1px rgba(243,243,243,1);
      display: flex;
      align-items: center;
      justify-content: space-around;
      p{
        flex: 1;
        text-align: left;
        color:#D2C4B3;
        font-size: 0.42rem;
        span{
          display: inline-block;
          width:2.2rem;
          text-align: center;
          em{
            
          }
          i{
            display: inline-block;
            margin-top:0.2rem;
            width: 0.84rem;
            height: 4px;
            border-radius:0.1rem;
            
            position: relative;
            top: 0.14rem;
          }
        }
        
      }
      p.active{
        span{
          color:#62431D;
          i{
            background:linear-gradient(270deg,rgba(255,211,120,1) 0%,rgba(255,155,54,1) 100%);
          }
        }
      }
    }
    .example{
      margin-top: 0.4rem;
      margin-left: 0.4rem;
      margin-right: 0.4rem;
      .bb-award{
        font-size: 0.3rem;
        color:#62431D;
        margin-bottom:0.2rem;
        em{
          font-weight:500;
        }
      }
      .calculate{
        font-size: 0.3rem;
        color:#F54D3E;
        margin-bottom:0.4rem;
      }
      .img_title{
        width: 1.947rem;
        height: 0.587rem;
        background-image:url(../assets/images/db/pic_slt@3x.png);
        background-size:100%;
      }
      .formula{
        margin-top: 0.267rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fa{
          background-image:-webkit-linear-gradient(360deg, rgba(253,184,24,1), rgba(255,235,134,1));
        }
        .fb{
          background-image:-webkit-linear-gradient(180deg, rgba(255,237,214,1), rgba(255,192,155,1));
        }
        .f-b{
          height: 1.333rem;
          box-sizing:border-box;
          padding:1px; 
          border-radius:0.133rem; 
         
          .f_one{

            height: 100%;
            border-radius:0.133rem;
            background: #fff;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            padding: 0rem 0.1rem;
            p{
              font-size:0.287rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(98,67,29,1);
              line-height:0.4rem;
              margin-bottom: 0.1rem;
            }
            span{
              font-size:0.287rem;
              font-family:PingFangSC-Medium;
              font-weight:500;
              color:rgba(98,67,29,1);
              line-height:0.4rem;
            }
          }
          .f_o{
            border-image:linear-gradient(360deg, rgba(253,184,24,1), rgba(255,235,134,1)) 2 2;
          }

        }
       
        .f_two{
          font-size:0.32rem;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(98,67,29,1);
          line-height:0.44rem;
        }
        
      }
      .content{
        margin-top: 0.4rem;
        p{  
          font-size:0.32rem;
          font-family:PingFangSC-Light;
          font-weight:300;
          color:rgba(152,124,82,1);
          line-height:0.533rem;
          margin-bottom: 0.1rem;
        }
      }
      .ex-data{
        font-size:0.3rem;
        font-weight: 500;
        color:#987C52;

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
          padding:0.4rem 0.4rem;
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
            align-items: flex-end;
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
          }
        }
      }
    }
    .two-list{
      .l-head{
          span:nth-of-type(1){
            flex:2;
          }
          span:nth-of-type(2){
            flex:2;
          }
          span:nth-of-type(3){
            flex:2;
           
          }
          span:nth-of-type(4){
            flex:3;
           
          }
      }
      ul{
        li{
          span{
            align-items: center;
          }
           span:nth-of-type(1){
            flex:2;
           
          }
          span:nth-of-type(2){
            flex:2;
          }
          span:nth-of-type(3){
            flex:2;
            
          }
          span:nth-of-type(4){
            flex:3;
          }
        }
      }
    }
    .three-list{
      ul{
        li{
          padding:0.2rem 0.4rem;
          span{
            align-items: center;
          }
        }
      }
    }
  
    
  

}
</style>

