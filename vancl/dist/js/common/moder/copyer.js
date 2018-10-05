function Copyer(container){
    this.el = container;
}
Copyer.Template = `<div class="copybody" id="copybody">
<div>
    <p class="copy_nav1">
        <span>Copyright 2007 - 2018 vancl.com All Rights Reserved</span>
        <span class="footbold">许可证:</span>
        <span>京ICP证100557号</span>
        <span class="copyli4">京公网安备 11011502002400号</span>
        <span>出版物经营许可证新出发京批字第直110138号</span>
    </p>
    <p class="copy_nav2">
        <span class="copyli1">凡客诚品（北京）科技有限公司</span>
    </p>                
</div>
<div>
    <ul>
        <li class="honesty"><a href="##"></a></li>
        <li><a href="##"></a></li>
        <li class="safeguard"><a href="##"></a></li>
        <li class="record"><a href="##"></a></li>
        <li class="young"><a href="##"></a></li>
        <li class="cctv"><a href="##">
            <img src="http://localhost:2333/dist/image/kexin_brand_for_others.png" width="120" height="39">
        </a></li>
        <div class="clearcopy"></div>
    </ul>
</div>
</div>`;
$.extend(Copyer.prototype,{
    init:function(){
        this.createCopyer();
    },
    createCopyer:function(){
        this.content = $("<div></div>");
        this.content.html(Copyer.Template);
        this.el.append(this.content);
    }
})