function loginService(){
    //对象初始化
    this.init=function(){
        //(1)引入UserDao模块
        var LoginDao =  require('../dao/LoginDao');
        //(2)获得对象
        this.loginDao = new LoginDao();
        //(3)对象初始化
        this.loginDao.init();
    }

    this.checkUser=function(name,password,call){

        //获得工具类
        var tool=require('../tools/tool');
        var name=tool.crypto(name);
        var password=tool.crypto(password);

        this.selectUserByName(name,function(result){
            var body={
                state:0,
                msg:"hello"
            }

            //1,获得数组的长度
            var length = result.length;

            if(length==0){
                body.msg="没有当前用户账号，请注册新用户！"
            }else{
                //2,把密码从数组对象里面取出来
                var buffer = result[0].password;
                //3,判断用户是否合法
                if(password==buffer){
                    body.state=2;
                    body.msg="登录成功！";
                    //body.name=name;
                    //body.password=buffer;
                }else{
                    body.state=1,
                    body.msg="登录失败，密码错误，请重新输入密码！";
                }
            }
            call(body);
        });
    }

    this.selectUserByName=function(name,call){
        this.loginDao.selectUserByName(name,function(result){
            call(result);
        });
    }



}
module.exports=loginService;

