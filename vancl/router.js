const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer((req,res) => {
    if(req.url != "/favicon.ico"){
        //进行url解析
        const {
            query,
            pathname
        } = url.parse(req.url,true);
        if(pathname == "/"){
            fs.readFile("./dist/html/index.html",(err,data) => {
                res.writeHead(200,{
                    "content-type":"text/html;charset=utf8"
                });
                res.end(data);
            })
        }else if(/^\/.+\.js$/.test(pathname)){
            pathname_js = pathname.slice(1);
            fs.readFile(pathname_js,(err,data) => {
                res.writeHead(200,{
                    "content-type":"application/x-javascript;charset=utf8"
                });
                res.end(data);
            })

        }else if(/^\/dist\/image\/.+$/.test(pathname)){
            pathname_img = pathname.slice(1);
            fs.readFile(pathname_img,(err,data) => {
                res.writeHead(200,{
                    "content-type":"image/*;charset=utf8"
                });
                res.end(data);
            })

        }else if(/^\/.+\.css$/.test(pathname)){
            pathname_css = pathname.slice(1);
            fs.readFile(pathname_css,(err,data) => {
                res.writeHead(200,{
                    "content-type":"text/css;charset=utf8"
                });
                res.end(data);
            })

        }else if(/^\/dist\/html\/.+\.html$/.test(pathname)){
            pathname_css = pathname.slice(1);
            fs.readFile(pathname_css,(err,data) => {
                res.writeHead(200,{
                    "content-type":"text/html;charset=utf8"
                });
                res.end(data);
            })

        }else if(pathname == "/user.json"){
            pathname_json = "user.json";
            fs.readFile(pathname_json,(err,data) => {
                var str = data + "";
                
                if(query.type == "zhuce"){
                    var bStop = true;
                    if(data.length != 0){
                        var data = JSON.parse(str);
                        for(var i = 0;i < data.length;i ++){
                            if(data[i].username == query.zhanghao){
                                bStop = false;
                                res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                                let obj2 = {
                                    info: "账号已被注册",
                                    status: 0
                                }
                                res.end(JSON.stringify(obj2));
                                break;
                            }
                        }
                        if(bStop){
                            var obj = {};
                            obj.username = query.zhanghao;
                            obj.password = query.mima;
                            data.push(obj);
                            fs.writeFile("./user.json",JSON.stringify(data),(err) => {});
                            res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                            let obj1 = {
                                info: "账号注册成功",
                                status: 1
                            };
                            res.end(JSON.stringify(obj1));
                        }
                    }else{
                        var arr = [];
                        var obj = {};
                        obj.username = query.zhanghao;
                        obj.password = query.mima;
                        arr.push(obj);
                        fs.writeFile("./user.json",JSON.stringify(arr),(err) => {});
                        res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                        let obj3 = {
                            info: "账号注册成功",
                            status: 1
                        };
                        res.end(JSON.stringify(obj3));
                    }

                }else if(query.type == "denglu"){
                    var bDoor = true;
                    if(data.length != 0){
                        var data = JSON.parse(str);
                        for(var i = 0;i < data.length;i ++){
                            if(data[i].username == query.zhanghao && data[i].password == query.mima){
                                bDoor = false;
                                res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                                let obj5 = {
                                    info: "登录成功",
                                    status: 1
                                }
                                res.end(JSON.stringify(obj5));
                                break;
                            }
                        }
                        if(bDoor){
                            res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                            let obj6 = {
                                info: "账号或密码错误",
                                status: 0
                            };
                            res.end(JSON.stringify(obj6));
                        }

                    }else{
                        res.writeHead(200,{"content-type":"application/json;charset=utf8"});
                        let obj4 = {
                            info: "请先注册",
                            status: 0
                        };
                        res.end(JSON.stringify(obj4));
                    }

                }
            })
        }

    }
}).listen(2333);
console.log("服务器在localhost:2333上运行")