function LogoIn(){
    this.str = "";
    
    
}

$.extend(LogoIn.prototype,{
    init:function(){
        this.logoIn = $("#logoin");
        this.userinfo = $(".userinfo");
        this.userquick = $(".userquick");
        this.codeEm = $("#quickcode>em").eq(0);
        this.oInput = $(".userinfo>div>input");
        this.tips = $(".tips");
        this.getcode = $("#getcode");

        this.clicker();
   
    },
    clicker(){
        this.logoIn.click($.proxy(this.allClick,this));
    },
    allClick(e){
        var target = e.target;

        //快速登录与普通登录切换
        if(target.tagName == "LI"){

            //点击快速登录
            if($(target).prev().length){
                this.userinfo.eq(1).css("display","block");
                this.userinfo.eq(0).css("display","none");
                this.codenum = this.randomCode(6);
                this.codeEm.text(this.codenum);

            //点击普通登录
            }else{
                this.userinfo.eq(0).css("display","block");
                this.userinfo.eq(1).css("display","none");
            }
            $(target).addClass("on").siblings().removeClass("on");
            
        }

        //点击获取验证码 生成验证码
        if(target.tagName == "A" && target.className == "changecode"){
            this.codenum = this.randomCode(6);
            this.codeEm.text(this.codenum);
        }

        //点击登录
        if(target.tagName == "A" && target.id == "vancllogoin"){
            this.username = this.oInput.eq(0).val();
            this.password =  this.oInput.eq(1).val();

            //请求服务器看是否存在该账户
            var data = this.queryuser();
            if(data.status == 0){
                this.tips.eq(0).css("display","block");
            }else{
                alert(data.info)
            }
        }

        //点击获取验证码
        if(target.tagName == "A" && target.id == "getcode"){
            if( !/^\d{11,11}$/.test(this.getcode.val())){
                this.tips.eq(1).css("display","block");
                alert("手机验证码为：2333，请输入");
            }
        }

        //点击input框式验证框中存在值的时候进行验证
        if(target.tagName == "INPUT"){
            //先让所有提示框消失
            this.tips.css("display","none");
            //点击快速登录的 输入手机号的框
            if(this.oInput.eq(2).val()){
                if(!/^\d{11,11}$/.test(this.oInput.eq(2).val())){
                    this.bStop = false;
                    this.tips.eq(1).css({
                        display: "block"
                    });
                }else{
                    this.bStop = true;
                    this.tips.eq(1).css({
                        display: "none"
                    });
                }
            }
            //点击快速登录的验证码框
            if(this.oInput.eq(3).val()){
                if(this.oInput.eq(3).val() != this.codenum){
                    this.bStop = false;
                    this.tips.eq(2).css({
                        display: "block"
                    });
                }else{
                    this.bStop = true;
                }
            }
            //点击输入验证码框
            if(this.oInput.eq(4).val()){
                if(this.oInput.eq(4).val() != 2333){
                    this.bStop = false;
                    this.tips.eq(3).css({
                        display: "block"
                    });
                }else{
                    this.bStop = true;
                }
            }
        }
    },
    queryuser:function(){
        var res;
        $.ajax({
            "type": "get",
            "url": "http://localhost:2333/user.json",
            "data": {
                "type":"denglu",
                "zhanghao": this.username,
                "mima": this.password,
            },
            dataType: "json",
            async: false,
            success: function (data) {
                res = data;
            },
            error: function (err) {
                console.log(err);
            }
        });
        return res;
    },
    randomCode(n){
        var str = "";
        for(var i=0;i<n;i++){
            var num = parseInt(48+Math.random()*(122-48+1));
            while((num>=58&& num<=64) || (num>=91&&num<=96)){
                num = parseInt(48+Math.random()*(122-48+1));
            }
            str+=String.fromCharCode(num);
        }
    
        return str;
    }

})
new LogoIn().init();