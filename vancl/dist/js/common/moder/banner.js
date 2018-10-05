function Banner(container){
    this.el = container;
}
Banner.Template = `<div id="banner">
<ul>
    <li><a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=6373619"><img src="http://localhost:2333/dist/image/1200-535.jpg"></a></li>
    <li><img src="http://localhost:2333/dist/image/1200x535.jpg"></li>
    <li><a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=6379517"><img src="http://localhost:2333/dist/image/b1200-535.jpg"></a></li>
    <li><a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=6382766"><img src="http://localhost:2333/dist/image/sj---wt.jpg"></a></li>
    <li><a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=6379593"><img src="http://localhost:2333/dist/image/sj--njfg.jpg"></a></li>
    <li><a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=6378351"><img src="http://localhost:2333/dist/image/sjwy.jpg"></a></li>
</ul>
<div id="dirban">
    <a href="##">prev</a>
    <a href="##">next</a>
</div>
<div id="btnban">
    <a href="##" class="active"></a>
    <a href="##"></a>
    <a href="##"></a>
    <a href="##"></a>
    <a href="##"></a>
    <a href="##"></a>
</div>
</div>`;

$.extend(Banner.prototype,{
    init:function(){
        this.createBanner();
        this.aLi = $("#banner>ul>li");
        this.dir = $("#dirban>a");
        this.aBtn = $("#btnban>a");
        this.iNow = 0;
        this.Next = 0;
        this.banner = $("#banner");
        this.timer = null;
        this.autoPlay();
        this.event();

    },
    createBanner:function(){
        this.content = $("<div></div>");
        this.content.html(Banner.Template);
        this.el.append(this.content);
    },
    event:function(){
        this.banner.on("mouseover",$.proxy(this.over,this));
        this.banner.mouseout($.proxy(this.out,this));
        this.dir.eq(0).on("mouseover",[0],$.proxy(this.bgred,this));
        this.dir.eq(1).on("mouseover",[1],$.proxy(this.bgred,this));
        this.dir.eq(0).on("mouseout",[0],$.proxy(this.bgblack,this));
        this.dir.eq(1).on("mouseout",[1],$.proxy(this.bgblack,this));
        this.dir.eq(0).click($.proxy(this.prev,this));
        this.dir.eq(1).click($.proxy(this.next,this));
        for(var i=0;i<this.aBtn.length;i++){
            this.aBtn.eq(i).on("mouseover",[i],$.proxy(this.tochange,this))
        }
    },
    bgred:function(e){
        if(e.data==0){
            var posi = "0 -61px";
        }else{
            var posi = "-54px -61px";
        }
        this.dir.eq(e.data[0]).css("background-position",posi);
    },
    bgblack:function(e){
        if(e.data==0){
            var posi = "0 0";
        }else{
            var posi = "-54px 0";
        }
        this.dir.eq(e.data[0]).css("background-position",posi);
    },
    prev:function(){
        if(this.Next == 0){
            this.Next = this.aLi.length-1;
        }else{
            this.Next--;
        }
        this.toImg();
    },
    next:function(){
        if(this.Next == this.aLi.length-1){
            this.Next = 0;
        }else{
            this.Next++;
        }
        this.toImg();
    },
    tochange:function(e){
        this.aLi.eq(e.data[0]).fadeTo(1000,1);
        this.aLi.eq(this.Next).fadeTo(1000,0)
        this.Next = e.data[0];
        this.aBtn.eq(this.Next).addClass("active").siblings().removeClass("active");
        this.iNow = this.Next;
    },
    out:function(){
        this.autoPlay();
    },
    over:function(){
        clearInterval(this.timer);
    },
    autoPlay:function(){
        this.timer = setInterval($.proxy(this.handlePlay,this),3000)
    },
    handlePlay:function(){
        if(this.Next == this.aLi.length-1){
            this.Next = 0;
        }else{
            this.Next++;
        }
        this.toImg();
    },
    toImg:function(){
        this.aLi.eq(this.iNow).fadeTo(1000,0);
        this.aLi.eq(this.Next).fadeTo(1000,1);
        this.aLi.eq(this.Next).css("z-index","100").siblings().css("z-index","10");
        this.aBtn.eq(this.Next).addClass("active").siblings().removeClass("active");
        this.iNow = this.Next;
    }
})

new Banner($("#vanclbanner")).init();