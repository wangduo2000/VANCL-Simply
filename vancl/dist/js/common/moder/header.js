function Header(container){
    this.el = container;
}

//头部顶栏区域渲染字符串模板
Header.Template = `<div class="headtopbody" id="headtopbody">
<div class="header-r-sign right" id="headhead">
    <ul class="header-r" id="headernav">
        <li class="header-nob"> 您好,欢迎光临凡客诚品！</li>
        <li><a href="http://localhost:2333/dist/html/logoin.html" class="enter">登录</a>&nbsp;|&nbsp;</li>
        
        <li><a href="http://localhost:2333/dist/html/register.html" class="login">注册</a></li>
        <li><a href="http://localhost:2333/dist/html/logoin.html" class="dingdan">我的订单</a></li>
    </ul>
    <ul id="headchart" class="headchart">
        <li><a href="http://localhost:2333/dist/html/notice.html" target="_blank"><img src="http://localhost:2333/dist/image/notice.png" alt="notice"> 网站公告</a></li>
        <li class="header-nob header-nav" id="headernob1">
            <img src="http://localhost:2333/dist/image/w1.jpg" class="chart01">
            <div class="header-chart" id="chartpic">
                <img src="http://localhost:2333/dist/image/weixin.png" alt="">
            </div>
            <img src="http://localhost:2333/dist/image/w2.jpg" alt="">
        </li>
    </ul>    
</div>
</div>`;

$.extend(Header.prototype,{
    init:function(){
        this.createHeader();
        this.chartmove();
    },
    //头部顶栏区域渲染
    createHeader:function(){
        this.content = $("<div></div>");
        this.content.html(Header.Template);
        this.el.append(this.content)
    },
    //微信图片的出现消失
    chartmove:function(){
        this.chart01 = $(".chart01");
        this.chart01.on("mouseover",$.proxy(this.over,this));
        this.chart01.on("mouseout",$.proxy(this.out,this));
    },
    over:function(){
        $("#chartpic").css("display","block");
    },
    out:function(){
        $("#chartpic").css("display","none");
    }
})


