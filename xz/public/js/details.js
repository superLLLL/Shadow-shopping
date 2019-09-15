$(function(){
  if(location.search.indexOf("lid=")!=-1){
    var lid=location.search.split("=")[1];
    (async function(){
      var res=await $.ajax({
        url:"http://localhost:3000/details",
        type:"get",
        data:{lid},//"lid="+lid,
        dataType:"json"
      })//ver res=open(res)
      var {product, pics, specs}=res;
      var vm=new Vue({
        el:"#details",
        data:{
          lid, product, pics, specs
        }
      })

      var divPrev=document.getElementById("preview");
      var ul=divPrev.querySelector(
        "div>div.card-body>div>ul"
      );
      var html="";
      for(var pic of pics){
        var {sm,md,lg}=pic;
        html+=`<li class="float-left p-1">
          <img src="${sm}" data-md="${md}" data-lg="${lg}">
        </li>`
      }
      ul.innerHTML=html;
      ul.style.width=62*pics.length+"px";
      var mImg=divPrev.querySelector(
        "div>img.card-img-top"
      )
      mImg.src=pics[0].md;
      var lgDiv=document.getElementById("div-lg");
      lgDiv.style.backgroundImage=`url(${pics[0].lg})`;
      //鼠标进入每个小图片，切换中图片和大图片
      ul.onmouseover=function(e){
        if(e.target.nodeName==="IMG"){
          var img=e.target;
          var md=img.dataset.md;
          var lg=img.dataset.lg;
          mImg.src=md;
          lgDiv.style.backgroundImage=`url(${lg})`;
        }
      }
      //小图片左右移动
      var $ul=$(ul);
      var $left=//找到左边按钮-后退按钮
        $("#preview>div>div.card-body>img:first")
      //找到右边按钮-前进按钮
      var $right=$left.nextAll().last()
      //如果pics中图片总数<=4
      if(pics.length<=4)
        //为右边按钮添加disabled class
        $right.addClass("disabled")
      var moved=0;//记录已经左移的图片个数
      $left.on("click",function(){
        var $left=$(this);
        if(!$left.is(".disabled")){
          moved--;//已经左移的图片个数-1
          //ul的marginLeft始终等于:-li宽度62*左移图片个数
          $ul.css("marginLeft",-62*moved)//不用px
          $right.removeClass("disabled")
          if(moved==0)
            $left.addClass("disabled")
        }
      })
      $right.on("click",function(){
        var $right=$(this);
        if(!$right.is(".disabled")){
          moved++;//已经左移的图片个数+1
          $ul.css("marginLeft",-62*moved)
          //让左边按钮去掉disabled class
          $left.removeClass("disabled")
          //如果pics中的图片总个数-moved次数==4
          if(pics.length-moved==4)
            //为右边按钮加上disabled class
            $right.addClass("disabled")
        }
      })

      var $mImg=$(mImg),//中图片
          $lgDiv=$(lgDiv),//大图片
          $mask=$("#mask"),//半透明遮罩
          $smask=$("#super-mask");//透明玻璃板
      var MSIZE=176,//mask的大小
          MAX=352-MSIZE;//top和left的最大值
      $smask
      .hover(
        function(){
          $mask.toggleClass("d-none");
          $lgDiv.toggleClass("d-none");
        }
      )
      .mousemove(function(e){
        var left=e.offsetX-MSIZE/2;
        var top=e.offsetY-MSIZE/2;
        if(left<0) left=0; 
        else if(left>MAX) left=MAX;
        if(top<0) top=0;
        else if(top>MAX) top=MAX;
        $mask.css({left,top});
        $lgDiv.css("background-position",
          `-${16/7*left}px -${16/7*top}px`)
      })
    })()
  }
})