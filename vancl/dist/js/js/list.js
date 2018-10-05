function List(){
    this.str = "";
    
    
}

$.extend(List.prototype,{
    init:function(){
        var _this = this;
        this.listproducts = $("#listproducts");
        this.floatdiv = $("#floatdiv");
        this.p1.then(function(arr){
            return _this.p3(arr);
        });

        this.floatfixed();
   
    },

    //请求信息
    p1:new Promise(function(resolve,reject){
        $.ajax({
            type:"get",
            async: false,
            url:"http://recom-s.vancl.com/product/GetCurrentRecommendProducts",
            dataType:"jsonp",
            jsonp:"callback",
            success:function(data){
                resolve(data);
            },
            error:function(e) {
                console.log(e)
            }
        });
    }),

    //信息渲染
    p3:function(data){
        for(var j=0;j<4;j++){
            for(var i=0;i<data.length;i++){
                this.str += `<li>
                    <div>
                        <a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=${data[i].ProductCode}" target="_blank">
                            <img src="http://p3.vanclimg.com/232/232/product/6/3/${parseInt(data[i].ProductCode/10000)%10}/${data[i].ProductCode}/mid/${data[i].Photos[0].FileName}" alt="${data[i].ProductName}" width="230" height="230">
                        </a>
                        
                    </div>
                    <p>
                        <a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=${data[i].ProductCode}" target="_blank">${data[i].ProductName}</a>
                    </p>
                    <div class="productprice">
                        <span>
                            售价￥
                            <strong>${data[i].SPrice}</strong>
                        </span>
                    </div>
                </li>`;    
            }            
        }

        this.content = $("<ul></ul>");
        this.content.html(this.str);
        this.listproducts.append(this.content);
    
    },

    //吸顶出现及消失
    floatfixed(){
        $(document).scroll($.proxy(this.fixed,this))
    },
    fixed(){
        if($(document).scrollTop()>237){
            this.floatdiv.css("position","fixed");
        }else{
            this.floatdiv.css("position","static");
        }
    }

})
new List().init();