var maxAge=60*60 * 1000;
exports.index=function(req,res){
    //(1)引入loginService
    var IndexService = require('../service/IndexService');
    //(2)创建对象
    var indexService = new IndexService();

    indexService.getData(req,function(result){
        res.render('index',result);
    });

}
exports.admin=function(req,res){
    ////(1)引入loginService
    //var IndexService = require('../service/IndexService');
    ////(2)创建对象
    //var indexService = new IndexService();
    //
    //indexService.getData(req,function(result){
    //    res.render('index',result);
    //});
    var ProductDao = require('../dao/ProductDao');
    //2，创建对象
    var productDao =  new ProductDao();
    //3,初始化
    productDao.init();
    //4,查询数据
    productDao.selectAll(function(result){

        res.render('admin',{product:result})
    });


}
exports.login=function(req,res){
    //1,解析客户端提交的数据
    var name  = req.body.name;
    var password  = req.body.password;
    //2,验证用户是否合法
    //(1)引入UserDao模块
    var LoginService =  require('../service/loginService');
    //(2)获得对象
    var loginService = new LoginService();
    //(3)对象初始化
    loginService.init();
    //(4)验证用户是否合法
    loginService.checkUser(name,password,function(result){
        if(result.state==2){
            req.session.sign=true;
            res.cookie('name',result.name, {maxAge:maxAge});
            res.cookie('password',result.password, {maxAge:maxAge});
        }
        //result.name=null;
        //result.password=null;
        res.end(JSON.stringify(result));
    },0)
}

exports.register=function (req,res) {
    //1,解析客户端提交的数据
    var name  = req.body.name;
    var email  = req.body.email;
    var password  = req.body.password;


    //2,向业务层要数据
    //(1),引入UserService模块
    var RegisterService = require('../service/RegisterSever');
    //(2),创建UserService对象
    var registerService = new RegisterService();
    registerService.init();
    //(3),插入用户
    registerService.insert(name,email,password,function(result){
        //3,把数据传给view
        res.end(JSON.stringify(result));
    });
}

exports.ProductService=function(req,res){

}
