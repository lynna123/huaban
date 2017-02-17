/**
 * Created by dell on 2016/11/30.
 */
window.onload= function () {
    var banner_bg=document.getElementById('bg-img');
    banner_bg.style.opacity=utils.css(banner_bg,'opacity',1);

    //瀑布流
    var wrapper=$('.creat_wrapper');
    var aUl=null;//按高度排序
    var aLi=null;
    var oBtn=document.getElementById('btn');
    var timer=null;
    var bOk=false;
    var data=[
        {imgSrc:'img/index/1.jpg',width:'236',height:'543'},
        {imgSrc:'img/index/2.jpg',width:'236',height:'405'},
        {imgSrc:'img/index/3.jpg',width:'236',height:'131'},
        {imgSrc:'img/index/4.jpg',width:'236',height:'131'},
        {imgSrc:'img/index/5.jpg',width:'236',height:'131'},
        {imgSrc:'img/index/6.jpg',width:'236',height:'687'},
        {imgSrc:'img/index/7.jpg',width:'236',height:'383'},
        {imgSrc:'img/index/8.jpg',width:'236',height:'181'},
        {imgSrc:'img/index/9.jpg',width:'236',height:'236'},
        {imgSrc:'img/index/10.jpg',width:'236',height:'201'},
    ];
    //1.创建一个元素
    function createLi(){
        /*<img src="" realImg="'+data[utils.rnd(0,9)].imgSrc+'" alt="">*/
        var itemData=data[utils.rnd(0,9)]
        aLi=$('<li><p class="description"><a href="">#水彩#</a></p><p class="stats"> <span title="转采" class="repin"><i></i>2674</span> <span title="喜欢" class="like"><i></i>629</span> <span title="评论" class="comment"><i></i>15</span> </p> <div class="convo"> <a href="#" title="庸人°" rel="nofollow" class="img"><img src="img/index/portrait1.png" class="avt"></a> <div class="text"><div class="inner"><div class="line"><a href="#" rel="nofollow" class="author x">庸人°</a>&nbsp;采集到</div> <div class="line"> <a href="#" rel="nofollow" class="x">繪· 筆尖藝術</a> </div> <a title="评论" class="replyButton"></a> </div> </div> </div> <div class="convo comments"> <div class="comment"> <a href="#" title="虫子819" class="img x"> <img src="img/index/portrait2.jpg" data-baiduimageplus-ignore="1" class="avt"> </a> <div class="content"> <a href="#">虫子819</a>:&nbsp;真不错 </div> <a title="回复" class="replyButton"></a> </div> <div class="comment"> <a href="#" title="虫子819" class="img x"> <img src="img/index/portrait3.jpg" data-baiduimageplus-ignore="1" class="avt"> </a> <div class="content"><a href="#">虫子819</a>:&nbsp;真不错 </div> <a title="回复" class="replyButton"></a> </div> <div class="comment"><a href="#" title="虫子819" class="img x"> <img src="img/index/portrait4.jpg" data-baiduimageplus-ignore="1" class="avt"> </a> <div class="content"> <a href="#">虫子819</a>:&nbsp;真不错 </div> <a title="回复" class="replyButton"></a> </div></div></li>')
        var oA=$('<a href="#"><img class="pic" src="" relImg="'+itemData.imgSrc+'" width="'+itemData.width+'" height="'+itemData.height+'" alt=""></a>');
        aLi.prepend(oA);
        return aLi;
    }
    li50();
    //2.创建50个li；
    function li50(){
        aUl=$('.creat_wrapper ul');
        for(var i=0; i<1; i++){
            var oLi=createLi();
            var ary=$.makeArray(aUl);
            //2.2sort排序
            ary.sort(function(a,b){
                return a.offsetHeight- b.offsetHeight;
            });
            //2.3把li插入最短的ul
            $(ary[0]).append(oLi)
        }
        //2.1类数组转数组


    }
    //3.满足条件加载图片；
    function showImg(){
        var aImg=$('.creat_wrapper .pic');
        var scrollBottom=utils.win('scrollTop')+utils.win('clientHeight');
        for(var i=0; i<aImg.length; i++){
            var imgPos=aImg[i].offsetTop+aImg[i].offsetHeight;
            if(imgPos<scrollBottom){
                lazyImg(aImg[i]);
            }
        }
    }
    //4.图片延迟加载
    function lazyImg(img){
        if(img.loaded) return;
        var tmpImg=new Image;
        tmpImg.src=img.getAttribute('relImg');
        tmpImg.onload=function(){
            img.src=this.src;
            tmpImg=null;
            img.parentNode.style.height=img.offsetHeight+'px';
            img.loaded=true;
        }
    }
    //5.点击按钮事件；
    function clickEvent(){
        var target=utils.win('scrollTop');
        var duration=1000;
        var interval=30;
        var step=target/duration*interval;
        timer=setInterval(function(){
            var curTop=utils.win('scrollTop');
            if(curTop<=0){
                clearInterval(timer);
                return;
            }
            curTop-=step;
            console.log(curTop)
            utils.win('scrollTop',curTop);
            bOk=false;
        },interval)
    }
    //..........
    li50();
    showImg();
    window.onscroll=function(){
        var scrollBottom=utils.win('scrollTop')+utils.win('clientHeight');
        if(bOk) clearInterval(timer);
        bOk=true;
        if(utils.win('scrollTop')>utils.win('clientHeight')){
            oBtn.style.display='block';
        }else{
            oBtn.style.display='none';
        }
        showImg();
        if(scrollBottom+100>=document.body.scrollHeight){
            li50();
        }
    };
    oBtn.onclick=clickEvent;

}

$(document).ready(function () {
    var n=0;
    var timer=setInterval(function(){
        if(n>=$('.follows a').length){
            clearInterval(timer);
        }
        $('.follows a').eq(n).fadeIn(100);
        n++;
    },200)

    //点击右侧加号按钮显示div
    $('#plus').hover(function(){
        $(this).siblings('div').show();
    },function(){
        $(this).siblings('div').hide();
    });



})