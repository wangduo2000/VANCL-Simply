function Naver(container){
    this.el = container;
}

Naver.Template = `<div class="nav">
<ul>
    <li class="nav1"><a href="http://localhost:2333/dist/html/index.html" class="nav1log"></a></li>
    <li class="nav2"><a href="http://localhost:2333/dist/html/index.html">首页</a></li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">衬衫</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>免烫</li>
                <li>易打理</li>
                <li>休闲</li>
                <li>高支</li>
                <li>法兰绒</li>
                <li>牛津纺</li>
                <li>青年布</li>
                <li>牛仔</li>
                <li>麻</li>
                <li>水洗棉</li>
                <li>泡泡纱</li></a>
            </ul>
        </div>
    </li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">T恤</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>水柔棉</li>
                <li>长袖T恤</li>
                <li>熊本熊</li>
                <li>全面冰爽</li>
                <li>POLO衫</li>
                <li>潮萌系列</li>
                <li>字</li>
                <li>复刻系列</li>
                <li>山鸟叔</li>
                <li>小宇宙</li>
                <li>电影台词</li>
                <li>科学怪人</li>
                <li>汪</li>
                <li>学霸</li>
                <li>运动T恤</li>
                <li>花花公子</li></a>
            </ul>
        </div>
    </li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">卫衣</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>熊本熊</li>
                <li>开衫</li>
                <li>连帽</li>
                <li>圆领</li>
                <li>水柔棉</li></a>
            </ul>
        </div>
    </li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">外套</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>运动户外</li>
                <li>皮肤衣</li>
                <li>西服</li>
                <li>C9设计款</li>
                <li>夹克</li>
                <li>nautilus</li>
                <li>大衣</li>
                <li>羽绒服</li></a>
            </ul>
        </div>
    </li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">针织衫</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>空调衫</li>
                <li>棉线衫</li>
                <li>羊毛衫</li></a>
            </ul>
        </div>
    </li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">裤装</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>沙滩裤</li>
                <li>针织裤</li>
                <li>休闲裤</li>
                <li>牛仔裤</li>
                <li>运动裤</li></a>
            </ul>
        </div>
    </li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">鞋</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>运动潮鞋</li>
                <li>复古跑鞋</li>
                <li>帆布鞋</li>
                <li>休闲鞋</li></a>
            </ul>
        </div>
    </li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">家居配饰</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>床品套件</li>
                <li>被子</li>
                <li>枕</li>
                <li>家居鞋</li>
                <li>背提包</li>
                <li>拉杆箱</li>
                <li>皮带钱包</li>
                <li>帽子</li>
                <li>眼镜</li>
                <li>毛巾</li></a>
            </ul>
        </div>
    </li>
    <li>
        <a href="http://localhost:2333/dist/html/list.html">内衣袜品</a>
        <span class="navline"></span>
        <div class="hidenav">
            <span></span>
            <ul><a href="http://localhost:2333/dist/html/list.html">
                <li>船袜</li>
                <li>中筒袜</li>
                <li>连裤袜</li>
                <li>内衣裤</li>
                <li>围巾披肩</li>
                <li>童装</li></a>
            </ul>
        </div>

    </li>
</ul>
</div>`;

$.extend(Naver.prototype,{
    init:function(){
        this.createNaver();
        this.navmover();
    },

    //导航内容渲染
    createNaver:function(){
        this.content = $("<div></div>");
        this.content.html(Naver.Template);
        this.el.append(this.content)
    },

    //导航内隐藏内容出现
    navmover:function(){
        this.aLi = $("#headnav>div>div>ul>li");
        for(var i=2;i<this.aLi.length;i++){
            this.aLi.eq(i).on("mouseover",[i],$.proxy(this.mover,this));
            this.aLi.eq(i).on("mouseout",[i],$.proxy(this.mout,this));
        }
    },
    mover:function(e){
        this.aLi.find(".hidenav").css("display","none");
        this.aLi.eq(e.data).find(".hidenav").css("display","block");

    },
    mout:function(e){
        this.aLi.eq(e.data).find(".hidenav").css("display","none");
    }
})
