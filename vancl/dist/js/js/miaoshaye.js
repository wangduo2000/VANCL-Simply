function Miaoshaye(){
    this.str = "";
    this.b = 0;
    this.c = 0;
    this.hour = 0
    this.d;
    this.di;
    this.state = ["正在秒杀","明日开始","即将开始"];
    this.state1 = ["剩余","距开始","距开始"];
    this.timecha = [0,3,5,10,12];
    this.iNow;
}

$.extend(Miaoshaye.prototype,{
    init:function(){
        var _this = this;

        this.p1.then(function(arr){
            return _this.p3(arr);
        })

        this.gettime();
        this.timeover();
    },

    //请求数据
    p1:new Promise(function(resolve,reject){
        this.product_1 = $("#product_1").val();
        $.ajax({
            type:"get",
            url:"http://recom-s.vancl.com/product/GetProductInfosBySeckill",
            dataType:"jsonp",
            data:"productcodes="+this.product_1,
            jsonp:"callback",
            success:function(data){
                resolve(data)
            },
            error:function(e) {
                console.log(e)
            }
        });
    }),
    
    //数据渲染
    p3:function(data){
        this.miaoshabox = $("#miaoshabox");
        for(var j=0;j<5;j++){
            this.str = "";
            for(var i=j*6;i<(j+1)*6;i++){
                this.str += `<li ProductCode="${data[i].ProductCode}">
                <a href="goodsdetil.html?ProductCode=${data[i].ProductCode}">
                    <img src="http://p3.vanclimg.com/234/360/product/6/3/7/${data[i].ProductCode}/mid/${data[i].Photos[0].FileName}">
                </a>
                <h3>
                    <a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=${data[i].ProductCode}">${data[i].ProductName}</a>
                </h3>
                <p class="money">
                    <a href="http://localhost:2333/dist/html/goodsdetil.html?ProductCode=${data[i].ProductCode}">
                        <span class="tolook"></span>
                    </a>
                    <span class="nowprice">
                        <em class="moneyflag">￥</em>
                        <em>${data[i].Price}</em>
                        <em class="takemoney">充值后${data[i].Price/2}元</em>
                    </span>
                </p>
                <p class="buynum">
                    <span class="price">￥${data[i].SPrice}</span>
                    <span class="numline right"></span>
                    <span class="right">已售0%</span>
                </p>
            </li>`;    
            }
            this.content = $("<ul></ul>");
            this.content.html(this.str);
            this.box = $("<div class="+"miaoshaproduct"+"></div>")
            this.box.append(this.content);
            this.miaoshabox.append(this.box)
        }
        this.aDiv = $(".miaoshaproduct");

        //第一栏背景改变，显示第一栏商品信息
        this.divshow(0);

    },

    //秒杀事件的渲染
    gettime:function(){
        var _this = this;
        setInterval(function(){

            //获取现在的时间
            _this.d = new Date();
            _this.hour = _this.d.getHours();
            // _this.di = _this.d.getDate();
            
            //获取未来一个小时的时间
            _this.f = _this.d.getFullYear()+"-"+(_this.d.getMonth()+1)+"-"+_this.d.getDate()+" "+(_this.hour+1)+":"+00+":"+00;

            //所有的时间框
            _this.timebox = $(".timenum");

            //时间改变
            for(var i=0;i<_this.timebox.length;i++){

                //已经设定的各个时间
                _this.c = _this.d.getFullYear()+"-"+(_this.d.getMonth()+1)+"-"+_this.d.getDate()+" "+(10+_this.timecha[i])+":"+00+":"+00;
                
                //获取各个时间框的设定时间
                _this.da = parseInt(_this.timebox.eq(i).prev().text());

                //判断当前时间是否为该时间框的时间后的一个小时内，即整点相同
                if(_this.da == _this.hour){

                    //相同则获取后面1个小时的时间
                    _this.iNow = new Date(_this.f);
                }else {

                    //不相同则获取当前时间
                    _this.iNow = new Date(_this.c);
                }

                //获得当前时间与获取的“时间框时间”的差值
                var time = _this.iNow.getTime() - _this.d.getTime();

                //得到相差时间的具体 时 分 秒
                var obj = _this.timediff(time);

                //判断当前时间框的状态及使用什么时间
                if((_this.da)>_this.hour){

                    //大于当前时间的框 暂未开始
                    _this.timecont = `<em>${_this.state[2]}</em>
                    <em>${_this.state1[2]}${obj.h}时${obj.m}分${obj.s}秒</em>`;
                }else if((_this.da)==_this.hour){

                    //整点相同，正在开始
                    _this.timecont = `<em>${_this.state[0]}</em>
                    <em>${_this.state1[0]}${obj.h}时${obj.m}分${obj.s}秒</em>`;
                }else{

                    //时间已过
                    _this.timecont = `<em>${_this.state[1]}</em>
                    <em>${_this.state1[1]}${obj.h+23}时${obj.m+60}分${obj.s+60}秒</em>`;
                }

                //写入时间
                _this.timebox.eq(i).html(_this.timecont)
            }
        },1000)
    },

    //划过时间框
    timeover:function(){
        this.aLi = $("#miaoshatop>ul>li");
        for(var i=0;i<this.aLi.length;i++){
            this.aLi.eq(i).on("mouseover",[i],$.proxy(this.Liover,this))
        }

    },

    //对应时间框背景变，对应商品栏出现
    Liover:function(e){
        this.aLi.eq(e.data[0]).addClass("timehover").siblings().removeClass("timehover");
        this.aLi.eq(e.data[0]).removeClass("timeout").siblings().addClass("timeout");
        this.divshow(e.data[0]);
    },
    divshow:function(el){
        this.aDiv.css("display","none")
        this.aDiv.eq(el).css("display","block");
    },

    //时间戳转相差的 天数 时 分 秒 
    timediff:function(time){
        var day = Math.floor(time / (24*60*60*1000));
        var h = Math.floor(time % (24*60*60*1000) / (60*60*1000));
        var m = Math.floor(time % (24*60*60*1000) % (60*60*1000) / (60*1000));
        var s = Math.floor((time % (24*60*60*1000) % (60*60*1000) % (60*1000) / 1000));
        return {
            day:day,
            h:h,
            m:m,
            s:s
        }
    }
})
new Miaoshaye().init();