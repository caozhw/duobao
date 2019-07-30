//判断机型
let AndroidOrIos = null;
let u = navigator.userAgent;				
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端				
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端	
if(isiOS){
    AndroidOrIos = 1; 
}else{
    AndroidOrIos = 2;
}

export{AndroidOrIos};