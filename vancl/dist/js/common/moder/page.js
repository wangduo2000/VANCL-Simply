function Pager(){
    this.headtop = $("#headtop");
    this.headsearch = $("#headsearch");
    this.headnav = $("#headnav");
    this.vanclfoot = $("#vanclfoot");
    this.vanclcopy = $("#vanclcopy");
    this.banfixed = $("#banfixed");
    
}

$.extend(Pager.prototype,{
    init:function(){
        this.header = new Header(this.headtop).init();
        this.searcher = new Searcher(this.headsearch).init();
        this.naver = new Naver(this.headnav).init();
        this.footer = new Footer(this.vanclfoot).init();
        this.copyer = new Copyer(this.vanclcopy).init();
        this.banfixeder = new Banfixed(this.banfixed).init();
        
        
    }
})
new Pager().init();