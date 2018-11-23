//引入express
var express=require('express');
//获得对象
var app=express();
var path = require('path');
//2,引入的ejs插件
var ejs = require('ejs');
//3,设置html引擎
app.set('view engine', 'html');
//4,设置视图地址
app.set('views', path.join(__dirname, 'views'));
//5,设置html引擎
app.engine('html', require('ejs').__express);
//6,静态文件
app.use(express.static('public'));
//7,引入body-parser模块
var bodyParser = require('body-parser');
//8，创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//cookie和session的引入
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({
    secret: '12345',
    saveUninitialized: true, //添加 saveUninitialized 选项
    resave: false, //添加 resave 选项
    name: 'express_11_cookie',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80*1000 }    //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}));




//首页
var indexControllers=require('./controllers/IndexControllers');
app.get('/index',indexControllers.index);
app.get('/admin.html',indexControllers.admin);
app.post('/login',urlencodedParser,indexControllers.login);
app.post('/register',urlencodedParser, indexControllers.register);//路由信息index

app.get('/about',function(req,res){
    res.render('about',{})
});
app.get('/login.html',function(req,res){
    res.render('login.html',{})
});
//app.get('/admin.html',function(req,res){
//    res.render('admin.html',{})
//});
//app.get('/admin.css',function(req,res){
//    res.render('admin.css',{})
//});
app.get('/contact',function(req,res){
    res.render('contact',{})
});
app.get('/icons',function(req,res){
    res.render('icons',{})
});
app.get('/mens',function(req,res){
    res.render('mens',{})
});
app.get('/single',function(req,res){
    res.render('single',{})
});
app.get('/typography',function(req,res){
    res.render('typography',{})
});
app.get('/womens',function(req,res){
    res.render('womens',{})
});




app.listen(8888,function(){
    console.log('启动');
});