function Banfixed(container){
    this.el = container;
}
Banfixed.Template = `<ul>
<li class="downApp"><a href="##"></a></li>
<li class="online"><a href="##"></a></li>
<li class="blacktop"><a href="#vanclhead"></a></li>
</ul>`;
$.extend(Banfixed.prototype,{
    init:function(){
        this.createBanfixed();
    },
    createBanfixed:function(){
        this.content = $("<div></div>");
        this.content.html(Banfixed.Template);
        this.el.append(this.content);
    }
})