//通过location得到对应id值
var Code = parseInt(location.href.split("?")[1].split("=")[1]);

function goodsDet(container){
    this.str = "";
    this.el = container;

}

$.extend(goodsDet.prototype,{
    init:function(){
        var _this = this;

        //选择服饰大小第一个选中
        $(".goodssizearea>ul>li").eq(0).addClass("checked");

        this.window = $(window);
        this.goodsdetilnav = $(".goodsdetilnav");
        this.goodstittab = $(".goodstittab");
        this.button = $(".addtochart>button").eq(0);
        this.shopcarframe = $(".shopcarframe");
        this.gooddetll = $("#gooddetll");
        this.hidenav = $("#hidenav");
        this.goodshidetit = $("#goodshidetit");
        this.box = $("#box");

        this.p1.then(function(arr){
            return _this.p2(arr);
        }).then(function(data){
            return _this.p3(data);
        })

        this.picclick();
        this.resizer();
        this.hideshow();
        this.choosesize();
        
                
    },
    //请求获得url中对应的商品信息
    p1:new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            url:"http://recom-s.vancl.com/product/GetProductInfosBySeckill",
            dataType:"jsonp",
            data:"productcodes="+Code,
            jsonp:"callback",
            success:function(data){
                resolve(data)
            },
            error:function(e) {
                console.log(e)
            }
        });
    }),
    //将对应商品的信息渲染到页面上
    p2:function(data){
        return new Promise(function(resolve,reject){

            //页面title里的商品名称
            $("head").eq(0).append(`<title>${data[0].ProductName}</title>`);

            //商品名称加小字优惠购买的渲染
            this.str1tit = `<h2>${data[0].ProductName}
                <span>充值购买更优惠</span>
            </h2>
            <span class="blank0"></span>`;
            $("#goodshidetit").append(this.str1tit);
            $(".goodstit").append(this.str1tit);
    
            //页面内容区 首页>商品名小字
            this.str2nav = `<a>${data[0].ProductName}</a>`;
            $(".goodsnav").append(this.str2nav);

            //放大镜的midle图渲染
            this.str3bigpic = `<div id="filter"></div>
            <img src="http://p3.vanclimg.com/232/232/product/6/3/${parseInt(data[0].ProductCode/10000)%10}/${data[0].ProductCode}/mid/${data[0].Photos[0].FileName}" class="middle" width="400" height="400">`;
            $("#box").append(this.str3bigpic)
    
            //放大镜小图的渲染
            this.str4smallpic = "";
            for(var i=0;i<(data[0].Photos.length<5?data[0].Photos.length:5);i++){
                this.str4smallpic += `<span>
                <img src="http://p3.vanclimg.com/232/232/product/6/3/${parseInt(data[0].ProductCode/10000)%10}/${data[0].ProductCode}/mid/${data[0].Photos[i].FileName}" class="small" width="68" height="68" data-url="http://p3.vanclimg.com/232/232/product/6/3/7/${data[0].ProductCode}/mid/${data[0].Photos[i].FileName}">
            </span>`;
            }
            $("#minImg").append(this.str4smallpic);
    
            //放大镜大图max的渲染
            this.strbigbigpic = `<img src="http://p3.vanclimg.com/232/232/product/6/3/${parseInt(data[0].ProductCode/10000)%10}/${data[0].ProductCode}/mid/${data[0].Photos[0].FileName}" id="maxImg">`;
            $("#max").append(this.strbigbigpic);

            //页面右边信息区的价格
            this.strtopprice = `<span>售价：</span>
            <span>￥<strong>${data[0].SPrice}</strong></span>`;
            $(".goodsmoeny>span").before(this.strtopprice);

            //页面右边信息区的 小图及颜色
            this.strcolor = `<li><img src="http://p3.vanclimg.com/232/232/product/6/3/${parseInt(data[0].ProductCode/10000)%10}/${data[0].ProductCode}/mid/${data[0].Photos[0].FileName}" width="36" height="36"><p>${data[0].ProductName.split(" ")[data[0].ProductName.split(" ").length - 1]}</p></li>`;
            $(".selcolor>ul").append(this.strcolor)

            //页面右边信息区的 已选的 颜色及尺寸
            this.strcolor1 = `<p>${data[0].ProductName.split(" ")[data[0].ProductName.split(" ").length - 1]}</p>
                <p>&nbsp;,&nbsp;</p>
                <p id="goodssizep">S</p>
                <input type="hidden" value="${data[0].ProductName}" />
                <input type="hidden" value="${data[0].SPrice}" />`;
            $(".goodsselected").append(this.strcolor1)

            //请求推荐商信息
            $.ajax({
                type:"get",
                async:false,
                url:"http://recom-s.vancl.com/product/GetCurrentRecommendProducts",
                dataType:"jsonp",
                cache:false,
                jsonp:"callback",
                success:function(arr){
                    resolve(arr);
                },
                error:function(e) {
                    console.log(e)
                }
            });
            
        })
    },
    p3:function(arr){
        //渲染推荐商品信息
        this.strrecommed = "";
        for(var i=0;i<5;i++){
            this.strrecommed += `<li ProductCode="${arr[i].ProductCode}">
                <a href="##"><img src="http://p3.vanclimg.com/232/232/product/6/3/${parseInt(arr[i].ProductCode/10000)%10}/${arr[i].ProductCode}/mid/${arr[i].Photos[0].FileName}" width="160" height="160" class="imgto"></a>
                <div>
                    <a href="##" class="imgto">${arr[i].ProductName}</a>
                    <div>￥${arr[i].Price}</div>
                </div>                       
            </li>`;            
        }
        //点击购物车弹出框的渲染
        this.hidenav.append(this.strrecommed);
        //下方推荐栏渲染
        this.gooddetll.append(this.strrecommed);
        
        //放大镜
        this.bigmirror = {
            cont:$("#cont"),
            box:$("#box"),
            filter:$("#filter"),
            middle:$(".middle"),
            minImg:$("#minImg"),
            max:$("#max"),
            maxImg:$("#maxImg"),
            str:"",
            init:function(){
                this.toogle();
                this.show();
                this.out();
        
            },
            toogle:function(){
                this.minImg.find("img").mouseover($.proxy(this.minImgover,this));
            },
            minImgover:function(e){
                var target = e.target;
                var src = $(target).attr("data-url");
                this.middle.attr("src",src);
                this.maxImg.attr("src",src);
            },
            show:function(){
                this.box.mouseover($.proxy(this.filtershow,this));
            },
            filtershow:function(){
                this.max.css("display","block");
                this.filter.css("display","block");
                this.move();
            },
            move:function(){
                this.box.mousemove($.proxy(this.filterposition,this));
            },
            filterposition:function(e){
                var x = e.pageX - this.filter.width()/2 - this.cont.offset().left;
                var y = e.pageY - this.filter.height()/2 - this.cont.offset().top;
                
                //有偏移需改变
                x = x > this.box.width() - this.filter.width() + 152 ? this.box.width() - this.filter.width() + 152 : (x < (0 + 152) ? (0 + 152) : x);
                y = y > this.box.height() - this.filter.height() + 10 ? this.box.height() - this.filter.height() + 10 : (y < (0 + 10) ? (0 + 10) : y);
    
                this.filter.css({
                    left:x,
                    top:y
                });
                this.maxImg.css({
                    left:-2*(x - 152),
                    top:-2*(y - 10)
                })
                
            },
            out:function(){
                this.box.mouseout($.proxy(this.boxout,this));
            },
            boxout:function(){
                this.max.css("display","none");
                this.filter.css("display","none");
            }
        
        }
        this.bigmirror.init();
        
    },
    //据页面大小判断商品分类栏是否展示
    resizer:function(){
        this.window.resize($.proxy(this.toresize,this));
    },
    toresize(){
        
        //窗口小于1220时分类栏消失
        if(this.window.width()<1220){
            this.goodsdetilnav.css("display","none");
        }else{
            this.goodsdetilnav.css("display","block");
        }

        //窗口小于800时使吸顶栏宽度定为800
        if(this.window.width()<800){
            this.goodstittab.css("width",800);
        }else{
            this.goodstittab.css("width","100%");
        }
    },
    //发生点击时
    picclick:function(){
        //下方推荐兰点击
        this.gooddetll.click($.proxy(this.togoodsdet,this));
        //购物车弹出框点击
        this.hidenav.click($.proxy(this.togoodsdet,this));
    },
    //据点击图跳转其他商品详情页
    togoodsdet:function(e){
        var target = e.target;
        if(target.tagName == "IMG" || target.tagName == "A"){
            this.ProductCode = $(target).parent().parent().attr("ProductCode");
            location.href = "http://localhost:2333/dist/html/goodsdetil.html?ProductCode="+this.ProductCode;
        }
    },
    //页面滚动时判断吸顶条是否出现
    hideshow:function(){
        $(document).scroll($.proxy(this.show,this));
    },
    //页面滚动时判断吸顶条是否出现
    show:function(){
        this.t = $(document).scrollTop();
        if(this.t>500){
            this.goodshidetit.css("display","block");
        }else{
            this.goodshidetit.css("display","none");
        }
    },
    //点击触发
    choosesize:function(){
        //信息区
        $(".selectarea").click($.proxy(this.choose,this));
        //购物车弹出框点击
        this.shopcarframe.click($.proxy(this.choose,this));
    },
    choose:function(e){
        var target = e.target;

        //尺寸改变
        if(target.tagName == "P" && target.className == "size"){
            $(target).parent().parent().find("li").removeClass("checked")
            $(target).parent().addClass("checked"); 
            $("#goodssizep").text($(target).text());
        }
        //弹出框出现
        if(target.tagName == "A" && target.className == "addtopshopcar"){
            this.shopcarframe.css("display","block");
            this.setlocal(target);
        }
        //立即购买
        if(target.tagName == "A" && target.id == "buynow"){
            this.setlocal(target);
        }

        //弹出框消失
        if(target.tagName == "SPAN" && target.id == "closeframe"){
            this.shopcarframe.css("display","none");
        }
        if(target.tagName == "A" && target.className == "closeremind"){
            this.shopcarframe.css("display","none");
        }
        
    },
    //进行localStorage操作
    setlocal:function(target){
        //获取商品信息
        this.val = parseInt($("#selectnum").val());
        this.color = $(target).parent().prev().find(".goodsselected>p").eq(0).text();
        this.size = $(target).parent().prev().find(".goodsselected>p").eq(2).text();
        this.img = $(target).parent().parent().find(".selcolor>ul>li>img").eq(0).attr("src");
        this.tit = $(target).parent().prev().find(".goodsselected>input").eq(0).val();
        this.price = $(target).parent().prev().find(".goodsselected>input").eq(1).val();

        //创建一个存储物品信息的对象
        var goods = {};

        //获取localStorage
        if(localStorage.getItem("info")){
            arr = JSON.parse(localStorage.getItem("info"));
        }else{
            var arr = [];
        }

        //localStorage操作
        //localStorage不为空时
        if(arr.length>0){
            var bStop = false;
            for(var i=0;i<arr.length;i++){

                //localStorage中有这个物品
                if(arr[i].ProductCode == Code && arr[i].size == this.size){

                    //数量改变
                    arr[i].num = parseInt(arr[i].num)+this.val;
                    bStop = true;
                    break;
                }
            }
            
            //不存在这个物品时，插入该物品
            if(!bStop){
                goods.ProductCode = Code;
                goods.num = this.val;
                goods.size = this.size;
                goods.color = this.color;
                goods.img = this.img;
                goods.tit = this.tit;
                goods.price = this.price;
                arr.push(goods);
            }
        
        //不存在这个物品时，插入该物品    
        }else{
            goods.ProductCode = Code;
            goods.num = this.val;
            goods.size = this.size;
            goods.color = this.color;
            goods.img = this.img;
            goods.tit = this.tit;
            goods.price = this.price;
            arr.push(goods);
        }

        //写入localStorage
        localStorage.setItem("info",JSON.stringify(arr))
    }
    
})
new goodsDet().init();