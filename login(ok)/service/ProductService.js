function ProductService(){
    //�����ʼ��
    this.init=function(){
        //(1)����UserDaoģ��
        var ProductDao =  require('../dao/ProductDao');
        //(2)��ö���
        this.productDao = new ProductDao();
        //(3)�����ʼ��
        this.productDao.init();
    }

    this.getList=function(call){
        this.productDao.selectAll(function (result) {
            call(result)
        })
    }



}
module.exports=ProductService;

