/**
 * Created by chLiu on 2018/10/18.
 */

function IndexService(){

    this.init=function(){

    }

    this.getData=function(req,call){

        var result={
        }
        this.checkUser(req,function(data1){
            result.state=data1.state;
            //2，查询产品的信息
            //(1)引入loginService
            var ProductService = require('../service/ProductService');
            //(2)创建对象
            var productService = new ProductService();
            //(3)对象初始化
            productService.init();

            productService.getList(function(data2){
                result.list=data2;
                call(result);
            });
        });

    }

    this.checkUser=function(req,call){
       var result={
           state:-1
       }

        if(req.session.sign){
            result.state=2;
            call(result);
            return;
        }
        var name =req.cookies.name;
        var password=req.cookies.password;

        if(name==null||password==null){
            call(result);
            return ;
        }else{
            //(1)引入loginService
            var LoginService = require('../service/loginService');
            //(2)创建对象
            var loginService = new LoginService();
            //(3)对象初始化
            loginService.init();
            //(4)验证用户都合法
            loginService.checkUser(name,password,function(result){
                if(result.state==2)
                {
                    req.session.sign=true;
                    result.state=2;
                    call(result);
                }else{
                    call(result);
                }
            },1);

        }
    }

}

module.exports=IndexService;