function Register(){
    this.str = "";
    
}

$.extend(Register.prototype,{
    init:function(){
        this.arr = [];
        this.register = $("#register");
        this.userquick = $(".userquick");
        this.codeEm = $(".getchecknum");
        this.vanclregister = $("#vanclregister");
        this.readtxt = $("#readtxt");
        this.regtips = $(".regtips");
        this.passwordstrong = $(".passwordstrong");
        this.oInput = $(".userinfomation>div>input");
        this.getcode = $(".getcode");
        this.bStop = true;
        
        this.codenum = this.randomCode(6);
        this.codeEm.text(this.codenum);
        this.getcode.css("margin-top",0);

        this.clicker();

    },
    clicker(){
        this.register.click($.proxy(this.allClick,this));
    },
    allClick(e){
        var target = e.target;

        //点击验证码生成新的验证码
        if(target.tagName == "EM" && target.className == "getchecknum"){
            this.codenum = this.randomCode(6);
            this.codeEm.text(this.codenum);
        }

        //点击统一条例 注册按钮变色
        if(target.tagName == "LABEL" || (target.className == "readtxt" && target.tagName == "INPUT")){
            if(this.readtxt.prop("checked")){
                this.vanclregister.css("background","#b52024");
            }else{
                this.vanclregister.css("background","#9a9a9a");
            }
        }

        //点击注册向服务器请求
        if(target.tagName == "A" && target.id == "vanclregister"){
            if(this.bStop){
                var zhanghao = this.oInput.eq(1).val();
                var mima =  this.oInput3;
                $.ajax({
                    "type": "get",
                    "url": "http://localhost:2333/user.json",
                    "data": {
                        "type":"zhuce",
                        "zhanghao": zhanghao,
                        "mima": mima,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        alert(data.info)
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }else{
                alert("信息填写错误");
            }
        }

        //点击input框将有值的框进行判断
        if(target.tagName == "INPUT"){
            this.regtips.css("display","none");
            $(target).next().css("display","inline-block");
            if(this.oInput.eq(0).val()){
                if(this.oInput.eq(0).val() != this.codenum){
                    this.bStop = false;
                    this.regtips.eq(1).css({
                        color: "red",
                        display: "inline-block"
                    });
                }else{
                    this.bStop = true;
                }
            }
            if(this.oInput.eq(2).val()){
                if(this.oInput.eq(2).val() != 2333){
                    this.bStop = false;
                    this.regtips.eq(4).css({
                        color: "red",
                        display: "inline-block"
                    });
                }else{
                    this.bStop = true;
                }
            }
            if(this.oInput.eq(3).val()){
                this.oInput3 = this.oInput.eq(3).val();
                if(/^[0-9]\w{5,13}$/.test(this.oInput3)){
                    this.passwordstrong.css("display","none");
                    this.passwordstrong.eq(0).css({
                        display: "block",
                        color: "red"
                    });
                }
                if(/^[a-zA-Z][a-zA-Z0-9]{5,13}$/.test(this.oInput3)){
                    this.passwordstrong.css("display","none");
                    this.passwordstrong.eq(1).css({
                        display: "block",
                        color: "red"
                    });
                }
                if(/^\w{5,13}\@$/.test(this.oInput3)){
                    this.passwordstrong.css("display","none");
                    this.passwordstrong.eq(2).css({
                        display: "block",
                        color: "red"
                    });
                }
            }else{
                this.regtips.eq(6).css({
                    color: "red",
                    display: "inline-block"
                });
                this.passwordstrong.css({
                    display: "none"
                })
            }
            if(this.oInput.eq(4).val()){
                if(this.oInput.eq(4).val() != this.oInput.eq(3).val()){
                    this.bStop = false;
                    this.regtips.eq(8).css({
                        color: "red",
                        display: "inline-block"
                    });
                }else{
                    this.bStop = true;
                }
            }
        }
        if(target.tagName == "A" && target.className == "getcode"){
            this.phone = $(target).prev().find("input").eq(0).val();
            if(/^\w{11,11}$/.test(this.phone)){
                alert("手机验证码为：2333，请输入");
            }
        }
    },
    randomCode(n){
        var str = "";
        for(var i = 0 ; i < n ; i ++){
            var num = parseInt(48 + Math.random()*(122 - 48 + 1));
            while((num >= 58&& num <= 64) || (num >= 91 && num <= 96)){
                num = parseInt(48 + Math.random()*(122 - 48 + 1));
            }
            str += String.fromCharCode(num);
        }
        return str;
    }

})
new Register().init();