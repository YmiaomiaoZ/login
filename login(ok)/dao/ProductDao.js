function ProductDao(){

    //�����ʼ��
    this.init=function(){
        //(1)����MySQLģ��
        var mysql  = require('mysql');
        //(2)����һ��connection
        this.connection = mysql.createConnection({
            host     : 'localhost',       //���� ip
            user     : 'root',            //MySQL��֤�û���
            password : '123456',                //MySQL��֤�û�����
            port: '3306',                 //�˿ں�
            database:'message'          //���ݿ����������
        });
        //(3),����
        this.connection.connect();
    }
    this.selectAll=function(call){
        //(4),��дsql���
        var  userGetSql = "SELECT * from goods";
//4,���в�ѯ����
        /**
         *query��mysql���ִ�еķ���
         * 1��userAddSql��д��sql���
         * 2��function (err, result)���ص�������err��ִ�д���ʱ���ش�һ��errֵ����ִ�гɹ�ʱ������result
         */
        this.connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(result);
        });
//5,���ӽ���
        this.connection.end();
    };
}
module.exports=ProductDao;
