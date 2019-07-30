<template>
  <div   :class="{ 'prompt': true, 'fade-in': isPrompt == 1,'fade-out': isPrompt == -1}"
   :style="{display:isShow == 0?'none':'block'}" >
    {{promptText}}
  </div>
  
</template>
<script>
export default {
  name: 'Prompt',
  props:['isPrompt','promptText'],
  mounted(){
   
  },
  data () {
    return {
      isShow:this.isPrompt
    }
  },
  watch:{
    isShow(){

　　}
  },
  methods:{
    
  }
}
</script>
<style scoped>
.prompt{
    position: absolute;
    bottom: 2rem;
    left: 2.2rem;
    width: 4rem;
    text-align: center;
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: 0.32rem;
    padding: 0.36rem 0.72rem;
    border-radius: 0.1rem;
    opacity: 0;
    transition: all 1s;

}
.fade-in{
  opacity: 1;
 
}
.fade-out{
  opacity: 0;
}

</style>