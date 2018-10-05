function Searcher(container){
    this.el = container;
}

//搜索栏的字符串模板
Searcher.Template = `<div class="searchbox left">
<div class="shopcart right" id="shopcart">
    <a href="http://localhost:2333/dist/html/shopcart.html" id="btnshopcart">购物车</a>
    <div class="shopcartcont" id="shopgoodw">
        <div class="near">最近加入的商品</div>
        <div></div>

        <div class="topborder">
            <div class="allprice left" id="allprice">
            <-- <div>共计(未计算促销折扣)</div>
                <div>￥278</div> -->
            </div>
            <a class="lookshopcart right" href="http://localhost:2333/dist/html/shopcart.html">查看购物车<i></i></a>
        </div>
    </div>
</div>                 
<div class="searchbox-w">
    <input type="submit" value="搜索" class="search-search">                    
    <input type="text" class="search-txt" placeholder="搜“麻衬衫”，体验与众不同"  id="searchsearch">
    <ul id="listli"></ul>

</div>
<div class="clear"></div>
    <div class="right searchnav">
        热门搜索：
        <a href="http://localhost:2333/dist/html/list.html">免烫衬衫</a>
        <a href="http://localhost:2333/dist/html/list.html">水柔棉</a>
        <a href="http://localhost:2333/dist/html/list.html">熊本熊</a>
        <a href="http://localhost:2333/dist/html/list.html">麻衬衫</a>
        <a href="http://localhost:2333/dist/html/list.html">帆布鞋</a>
        <a href="http://localhost:2333/dist/html/list.html">运动户外</a>
        <a href="http://localhost:2333/dist/html/list.html">家居</a>
    </div>
</div>`;


$.extend(Searcher.prototype,{
    init:function(){
        this.createSearcher();
        
        this.oList = $("#listli");
        this.oInput = $("#searchsearch");
        this.shopcart = $("#shopcart");
        this.btnshopcart = $("#btnshopcart");
        this.aDiv = $("#shopgoodw>div");
        this.search = $(".search-search");
        this.num = 0;

        this.over();
        this.inputin();
        this.search.on("click",$.proxy(this.clicker,this));
    },

    //搜索栏的渲染
    createSearcher:function(){
        this.content = $("<div></div>");
        this.content.html(Searcher.Template);
        this.el.append(this.content)
    },

    //点击搜索跳到列表页list.html
    clicker:function(e){
        var target = e.target;
        this.val = $(target).next().val();
        if(this.val){
            location.href = "http://localhost:2333/dist/html/list.html";
        }

    },

    //移动到购物车上的事件
    over:function(){
        this.shopcart.mouseover($.proxy(this.show,this))
        this.shopcart.mouseout($.proxy(this.hidden,this))
    },

    //购物车弹出框出现
    show:function(){
        this.shopgoodw = $("#shopgoodw");
        this.shopgoodw.css("display","block");

        //购物车弹出框内信息的渲染
        if(localStorage.getItem("info")){
            arr = JSON.parse(localStorage.getItem("info"));
        }else{
            var arr = [];
        }
        
        if(arr.length>0){
            this.str = "";
            this.num = 0;
            for(var i=0;i<arr.length;i++){
                this.str += `<div class="shopgoodw clearf">
                    <div>
                        <img src="${arr[i].img}" width="36" height="36">
                    </div>
                    <div>
                        <span>${arr[i].tit}&nbsp;尺寸${arr[i].size}</span>
                        <span class="pricenum">￥<i>${arr[i].price}</i>X<i>${arr[i].num}</i></span>
                    </div>
                </div>`;
                this.num += parseInt(arr[i].num);
            }

            //插入搜索内容
            this.aDiv.eq(1).html(this.str)
            this.strprice = "";
            this.money = 0;
            this.aDiv.find(".pricenum").each($.proxy(this.tolprice,this));
            this.btnshopcart.text("购物车("+this.num+")")

        }else{
            this.shopgoodw.html("您的购物车内暂没物品");
        }
    },

    //购物车弹出框内价格的计算
    tolprice:function(i){
        this.money += parseInt(this.aDiv.find(".pricenum").eq(i).find("i").eq(0).text())*parseInt(this.aDiv.find(".pricenum").eq(i).find("i").eq(1).text())
        this.strprice = `<div>共计(未计算促销折扣)</div>
            <div>￥${this.money}</div>`;
        $("#allprice").html(this.strprice)
    },

    //购物车弹出框消失
    hidden:function(){
        this.shopgoodw.css("display","none");
    },

    //搜索框的操作
    inputin:function(){
        this.oInput.bind("input",$.proxy(this.inputchange,this))
    },

    //在输入框搜索时 进行jsonp请求搜索内容
    inputchange:function(){
        $("#listli").css("display","block")
        
        this.searchdata();

    },
    searchdata:function(){
        $.ajax({
            type:"get",
            async:false,
            url:"http://page.vanclimg.com/autocompletehandler.ashx?callback=handle&k="+this.oInput.val()+"&limit=13",
            dataType:"jsonp",
            success:function(arr){
                var strsearch = "";
                for(var i=0;i<arr.length;i++){
                    strsearch += `<li>${arr[i].name}</li>`;
                }
                var oLister = $("#listli");
                oLister.html(strsearch);
                var aLi = $("#listli>li");
                aLi.on("click",function(e){
                    var target = e.target;
                    $("#searchsearch").val($(target).text());
                    oLister.css("display","none")
                })
            },
            error:function(e) {
                console.log(e)
            }
        });        
    },
})
function handle(data){
    $("#listli").text("");
    if(data){
        for(var i=0;i<data.length;i++){
            var li = $("<li></li>");
            li.text(data[i].name);
            $("#listli").append(li);
        }
    }
};
