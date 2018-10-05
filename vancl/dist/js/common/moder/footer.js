function Footer(container){
    this.el = container;
}

Footer.Template = `<div class="footserve footclear" id="footserve">
<ul>
    <li>
        <a href="##">
            <p><img src="http://localhost:2333/dist/image/onlinecustomer.png" class="customer"></p>
            <p class="oncustomer">7X9小时在线客服</p>
        </a>
    </li>
    <li>
        <a href="##">
            <p><img src="http://localhost:2333/dist/image/seven.png" alt="" class="seven"></p>
            <p>7天内退货</p>
            <p>购物满199元免运费</p>
        </a>
    </li>
    <li class="footserve3">
        <a href="##">
            <p><img src="http://localhost:2333/dist/image/2014_8_29_16_39_33_7709.jpg" width="104" height="104"></p>
            <p>扫面下载<i>凡客</i>客户端</p>
        </a>
    </li>
</ul>
</div>
<div class="footlink footclear" id="footlink">
<ul class="footclear">
    <li><a href="">关于凡客</a></li>
    <li><a href="">新手指南</a></li>
    <li><a href="">配送范围及时间</a></li>
    <li><a href="">支付方式</a></li>
    <li><a href="">售后服务</a></li>
    <li class="bordernone"><a href="">帮助中心</a></li>
</ul>
</div>`;

$.extend(Footer.prototype,{
    init:function(){
        this.createFooter();
    },
    createFooter:function(){
        this.content = $("<div></div>");
        this.content.html(Footer.Template);
        this.el.append(this.content)
    }
})