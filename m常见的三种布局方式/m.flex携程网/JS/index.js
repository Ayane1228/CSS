window.addEventListener('load',function(){
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    /* 获得focus的宽度 */
    var w = focus.offsetWidth;
    /* 为用的定时器自动轮播图片 */
    var index = 0;
    var timer = setInterval(function(){
        index++;
        var translatex = - index * w;
        ul.style.transition = 'all .3s'; //给ul添加一个过渡效果
        ul.style.transform = 'translateX(' + translatex + 'px)';
    },2000);
    /* 
        最后一张之后等过度完成之后再判断 translationend过渡完成之后调用的函数 判断过渡是否完成
        再将图片快速回到开始
        */
    ul.addEventListener('transitionend',function(){
    /* 进行判断 */
    if(index >= 3){
        index = 0;
        /* 不加过渡快速返回到目标位置 */
        ul.style.transition = 'none'; 
        var translatex = - index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }else if(index < 0){
        index = 2;
        ul.style.transition = 'none'; 
        var translatex = - index * w;
        ul.style.transform = 'translateX('+translatex+'px)';    
    };
    /* 小圆点跟随变变化 */  
    /* 把ol里面带有current的类名选出来并去掉类名 remove 不加current*/
    ol.querySelector('.current').classList.remove('current'); 
        /* 把当前索引号的li加上current add */ 
        ol.children[index].classList.add('current');
    })  
    /* 手指滑动轮播图 */
    /* 触摸元素 touchstart：获得手指的初始坐标并取消轮播图 */
    var startx = 0;
    var movex = 0;
    ul.addEventListener('touchstart',function(e){
        startx = e.targetTouches[0].pageX;
        clearInterval(timer); 
    })   
    /* 移动手指 touchmove 计算手指的滑动距离 并且移动盒子 */
    ul.addEventListener('touchmove',function(e){
         /* 手指拖动的时候不需要动画效果 */
         ul.style.transform = 'none';        
         /* 手指移动距离 */
        movex = e.targetTouches[0].pageX - startx;
        /* 移动盒子 盒子原来的位置 + 手指移动的距离*/
         var translatex = -index * w + movex;
        ul.style.transform = 'translateX(' + translatex + 'px)'
        });
        /* 如果移动小于50px回弹 大于50px 播放下一张 */        
        ul.addEventListener('touchend',function(e){
            /* 如果移动距离大于50px(取绝对值)就直接滑动，播放上一张或下一张 */
            if(Math.abs(movex)> 50){
                /* 右划==>播放下一张 movex正值 左相反*/
                if(movex > 0){
                    index--;
                }else{
                    index++;
                }
                // 判断完成之后图片进行移动加上滑动效果
                var translatex = -index * w ;
                ul.style.transform = 'all .3s';  
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }else
            /* 不到50的时候 index不变回到原来位置 */
            {
                var translatex = -index * w ;
                ul.style.transform = 'all .1s';  
                ul.style.transform = 'translateX(' + translatex + 'px)';
            };
            /* 打开计时器 */
            clearInterval(timer);
            timer = setInterval(function(){
                index++;
                var translatex = - index * w;
                ul.style.transition = 'all .3s'; //给ul添加一个过渡效果
                ul.style.transform = 'translateX(' + translatex + 'px)';
            },2000);
        });
})