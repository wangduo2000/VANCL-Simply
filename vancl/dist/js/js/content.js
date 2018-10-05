function Content(){
    this.str = "";
    
    
}


//优选推荐  下装推荐    更多精品 区信息渲染
$.extend(Content.prototype,{
    init:function(){
        var _this = this;
        this.recommendationgoodstop = $("#recommendationgoodstop");
        this.moregoods = $("#moregoods");
        this.trousergoods = $("#trousergoods");


        this.p1.then(function(arr){
            return _this.p3(arr);
        });

    },
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
    p3:function(data){
        
        for(var i=0;i<(data.length<=12?data.length:12);i++){
            this.str += `<li>
                <a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=${data[i].ProductCode}">
                    <img src="http://p3.vanclimg.com/232/232/product/6/3/${parseInt(data[i].ProductCode/10000)%10}/${data[i].ProductCode}/mid/${data[i].Photos[0].FileName}" alt="${data[i].ProductName}">
                </a>
                <h3>
                    <!-- <span>充值购买更优惠</span> -->
                    ${data[i].ProductName}
                </h3>
            </li>`;    
        }
        this.content = $("<ul></ul>");
        this.content.html(this.str);
        this.recommendationgoodstop.append(this.content);
        this.str = "";
        for(var i=0;i<8;i++){
            this.str += `<li>
                <a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=${data[i].ProductCode}">
                    <img src="http://p3.vanclimg.com/232/232/product/6/3/${parseInt(data[i].ProductCode/10000)%10}/${data[i].ProductCode}/mid/${data[i].Photos[0].FileName}" alt="${data[i].ProductName}">
                </a>
                <h3>
                    <span>￥${data[i].SPrice}起</span>
                    <!-- <span>充值购相当于</span> -->
                    ${data[i].ProductName}
                </h3>
            </li>`;

        }
        this.content = $("<ul></ul>");
        this.content.html(this.str);
        this.moregoods.append(this.content);
        this.content = $("<ul></ul>");
        this.content.html(this.str);
        this.trousergoods.append(this.content);
    },

})
new Content().init();