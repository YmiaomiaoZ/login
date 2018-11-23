/**
 * Created by admin on 2018/10/16.
 */
function RegisterService(){

    console.log(999)
    this.init=function(){
        //(1)引入userDao模块
        var RegisterDao =  require('../dao/RegisterDao');
        //(2)创建对象
       this.registerDao =  new RegisterDao();
        //(3)对象初始化
        this.registerDao.init();
    }

    this.insert=function(name,email,password,call){

        var resData={
            insertId:-1,
            msg:''
        }
        var tool=require("../tools/tool");
        var name=tool.crypto(name);
        var password=tool.crypto(password);
        var that = this;
        this.checkUser(name,function(result){
            if(result){
                resData.msg="用户已经存在！";
                call(resData);
            }else{
                that.registerDao.insertUser(name,email,password,function (data) {
                    resData.msg="注册成功";
                    resData.insertId=data.insertId;

                    call(resData);

                });
            }

        });
    }

    this.selectUserByName=function(name,call){
        //(1)查询用户数据
        this.registerDao.selectUserByName(name,function(result){

            call(result);
        })
    }
    this.checkUser=function(name,call){
        this.selectUserByName(name,function(result){
            if(result.length==0){
                call(false);
            }else{
                call(true);
            }
        });
    }

}
module.exports=RegisterService;