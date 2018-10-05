function Miaosha(container){
    this.str = "";
    this.el = container;
}

$.extend(Miaosha.prototype,{
    init:function(){
        var _this = this;
        
        this.p1.then(function(arr){
            return _this.p2(arr);
        }).then(function(data){
            return _this.p3(data);
        });

        this.picclick();
    },
    
    //请求最新商品的 ProductCode
    p1:new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            async: false,
            url:"http://recom-s.vancl.com/CmsSeckill/GetMainIndexSeckillForWww",
            dataType:"jsonp",
            data:{showNum: 5},
            jsonp:"callback",
            success:function(data){
                resolve(data.data.productCodes);
            },
            error:function(e) {
                console.log(e)
            }
        });
    }),

    //请求商品信息
    p2:function(arr){
        return new Promise(function(resolve,reject){
            $.ajax({
                type:"get",
                url:"http://recom-s.vancl.com/product/GetProductInfosBySeckill",
                dataType:"jsonp",
                data:"productcodes="+arr,
                jsonp:"callback",
                success:function(data){
                    resolve(data);
                },
                error:function(e) {
                    console.log(e)
                }
            });
        })
    },

    //商品信息渲染
    p3:function(data){
        for(var i=0;i<data.length;i++){
            this.str += `<li ProductCode="${data[i].ProductCode}">
                <a href="##">
                    <img src="http://p3.vanclimg.com/232/232/product/${parseInt(data[i].ProductCode/1000000)%10}/${parseInt(data[i].ProductCode/100000)%10}/${parseInt(data[i].ProductCode/10000)%10}/${data[i].ProductCode}/mid/${data[i].Photos[0].FileName}" alt="">
                    <div class="miaoshagoodsname">${data[i].ProductName}</div>
                    <div class="miaoshaprice">
                        <span class="oldprice">￥<em>${data[i].Price}</em></span>
                        <span class="newprice">￥<em>${data[i].SPrice}</em></span>
                        <span class="offprice">充值后<em>${data[i].SPrice/2}</em>元</span>
                    </div>
                </a>
            </li>`;    
        }
        this.content = $("<ul></ul>");
        this.content.html(this.str);
        this.el.append(this.content);
    },

    //点击跳转
    picclick:function(){
        $("#miaoshacontainer").click($.proxy(this.liclick,this))
    },
    liclick:function(e){
        var target = e.target;
        if(target.tagName == "IMG" || target.tagName == "DIV"){
            this.ProductCode = $(target).parent().parent().attr("ProductCode");
            location.href = "http://localhost:2333/dist/html/goodsdetil.html?ProductCode="+this.ProductCode;
        }
        
        
    }
})

new Miaosha($("#miaoshacontainer")).init();
