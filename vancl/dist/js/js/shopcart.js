function ShopCart(){
    this.str = "";
    this.str2 = "";
    this.money = 0;
    this.allNum = 0;
    this.oneMoney = 0;
}

$.extend(ShopCart.prototype,{
    init:function(){
        this.barsummary = $("#barsummary");
        this.shopcartchange = $("#shopcartchange");
        this.oList = $("#list");
        this.allcheck = $("#allcheck");
        
        //获取localStorage
        if(localStorage.getItem("info")){
            this.arr = JSON.parse(localStorage.getItem("info"));
        }else{
            this.arr = [];
        };

        this.replenish();
        this.clicker();
        
    },

    //信息渲染
    replenish(){
        //各个商品信息渲染
        for(var i=0;i<this.arr.length;i++){
            this.str += `<tr>
                <td>
                    <input type="checkbox" class="check">
                </td>
                <td>
                    <div class="tabtoppic" ProductCode="${this.arr[i].ProductCode}">
                        <img src="${this.arr[i].img}" width="48" height="48" class="imgto" />
                        <p>${this.arr[i].tit}</p>
                    </div>
                </td>
                <td>${this.arr[i].size}</td>
                <td>￥
                    <em>${this.arr[i].price}</em>
                </td>
                <td>
                    <div class="quantity">
                        <a class="left" id="reduce">-</a>
                        <input type="text" value="${this.arr[i].num}" class="left" id="num">
                        <a class="left" id="add">+</a>
                    </div>
                </td>
                <td>-</td>
                <td>￥
                    <em>${this.arr[i].price*this.arr[i].num}</em>
                </td>
                <td>
                    <a class="del">删除</a>
                </td>
            </tr>`;
            this.oList.html(this.str);
            this.check = this.oList.find(".check");

            //总价及总数量计算
            this.money += this.arr[i].price*this.arr[i].num;
            this.allNum += this.arr[i].num;
        };

        //全选栏默认选中
        this.allcheck.prop("checked","checked");
        
        //各个商品选择框默认选中
        this.oList.find(".check").prop("checked","checked");

        //底部总价及总数渲染
        this.str2 = `<div class="bar">
                <input type="checkbox" id="allcheckbtn"><label for="allcheckbtn">全选</label>
                <span>
                    数量总计：
                    <em id="allnum">${this.allNum}</em>
                    件
                </span>
                <span>
                    <em>您目前可享受全场购物免运费</em>
                </span>
            </div>
            <div class="summary">
                产品金额总计(不含运费)：
                <span class="amount">
                    ￥
                    <em>${this.money}</em>
                </span>
            </div>
            <div class="btnpanel">
                <a href="##" class="gotobuy">&lt;&lt;继续购物</a>
                <a href="##" class="gotopay">去结算&gt;&gt;</a>
            </div>`;
        this.barsummary.html(this.str2);

        this.allcheckbtn = $("#allcheckbtn");
        this.amount = $(".amount>em").eq(0);
        this.allgoodsnum = $("#allnum");

        //选中框选中
        this.allcheckbtn.prop("checked","checked");
    },

    //点击事件委托
    clicker(){
        this.shopcartchange.click($.proxy(this.click,this));
    },

    //点击事件
    click(e){
        var target = e.target;

        //点击两个全选的一个
        if(target.tagName == "INPUT" && (target.id == "allcheck" || target.id == "allcheckbtn")){
            this.check

            //如果全选没被选中则都不选中
            if(!$(target).prop("checked")){
                this.check.prop("checked","");
                this.allcheck.prop("checked","");
                this.allcheckbtn.prop("checked","");
            }else{

                //如果全选被选中则都选中
                this.check.prop("checked","checked");
                this.allcheck.prop("checked","checked");
                this.allcheckbtn.prop("checked","checked");
            }
        }

        //点击各个商品的选中按钮
        if(target.tagName == "INPUT" && target.className == "check"){
            this.bStop = true;

            //判断所有商品是否有没选中的
            this.check.each($.proxy(this.tocheck,this));

            //各个商品有未选中的商品
            if(this.bStop){

                //全选取消
                this.allcheck.prop("checked","checked");
                this.allcheckbtn.prop("checked","checked");

                //各个商品全部选中
            }else{

                //全选选中
                this.allcheck.prop("checked","");
                this.allcheckbtn.prop("checked","");
            }
        }

        //点击减少数量按钮
        if(target.tagName == "A" && target.id == "reduce"){
            this.numVal = $(target).next();
            this.num = this.numVal.val();

            //只有数量大于1，才减少1
            if(this.num>1){
                this.num--;
                this.allNum--;
            }else{
                this.num = 1;
            }

            //写入数量改变后商品个数，并即时改变单个商品的价格
            this.numVal.val(this.num);
            this.allgoodsnum.text(this.allNum);
            this.td = $(target).parent().parent();
            this.oneMoney = this.num*parseInt(this.td.prev().find("em").eq(0).text());
            this.td.next().next().find("em").eq(0).text(this.oneMoney)
        }

        //点击增加数量按钮
        if(target.tagName == "A" && target.id == "add"){
            this.numVal = $(target).prev();
            this.num = this.numVal.val();

            //数量增加1
            this.num++;
            this.allNum++;

            //写入数量改变后商品个数，并即时改变单个商品的价格
            this.numVal.val(this.num);
            this.allgoodsnum.text(this.allNum);
            this.td = $(target).parent().parent();
            this.oneMoney = this.num*parseInt(this.td.prev().find("em").eq(0).text());
            this.td.next().next().find("em").eq(0).text(this.oneMoney)
        }

        //点击删除按钮
        if(target.tagName == "A" && target.className == "del"){

            //删除点击的这个商品信息
            var which = $(target).parent();
            which.parent().remove();

            //同时减少商品的总数量，并写入减少的总数量
            this.allNum -= which.prev().prev().prev().find("input").eq(0).val();
            this.allgoodsnum.text(this.allNum);
        }

        //点击图片跳转商品详情页面
        if(target.tagName == "IMG" || target.tagName == "P"){
            location.href = "http://localhost:2333/dist/html/goodsdetil.html?ProductCode="+$(target).parent().attr("ProductCode");
        }

        //点击继续购物，跳转到最后加入购物车的商品详情页
        if(target.tagName == "A" && target.className == "gotobuy"){
            location.href = "http://localhost:2333/dist/html/goodsdetil.html?ProductCode="+this.arr[this.arr.length - 1].ProductCode;
        }

        this.tr = $("#list>tr");

        //计算事件发生后的总价格
        this.allPrice();

        //点击立即结算，改变localStorage中的信息
        if(target.tagName == "A" && target.className == "gotopay"){
            if(localStorage.getItem("info")){
                arr = JSON.parse(localStorage.getItem("info"));
            }
            if(arr.length>0){
                for(var i=0;i<arr.length;i++){
                    arr[i].num = parseInt(this.tr.eq(i).find("td").eq(4).find("input").eq(0).val());
                }    
            }
            localStorage.setItem("info",JSON.stringify(arr));
            location.href = "http://localhost:2333/dist/html/logoin.html";
        }
    },

    //选中框状态
    tocheck(i){
        if(!this.check.eq(i).prop("checked")){
            this.bStop = false;
            return false;
        }
    },

    //计算价格
    allPrice(){
        this.money = 0;
        this.tr.each($.proxy(this.toAllPrice,this))
        this.amount.text(this.money);
    },
    toAllPrice(i){
        this.trTd = this.tr.eq(i).find("td");
        if(this.trTd.eq(0).find("input").eq(0).prop("checked")){
            this.money += parseInt(this.trTd.eq(6).find("em").eq(0).text());
        }
        
    }

})

new ShopCart().init();
