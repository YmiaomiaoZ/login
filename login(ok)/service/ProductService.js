function ProductService(){
    //对象初始化
    this.init=function(){
        //(1)引入UserDao模块
        var ProductDao =  require('../dao/ProductDao');
        //(2)获得对象
        this.productDao = new ProductDao();
        //(3)对象初始化
        this.productDao.init();
    }

    this.getList=function(call){
        this.productDao.selectAll(function (result) {
            call(result)
        })
    }



}
module.exports=ProductService;

