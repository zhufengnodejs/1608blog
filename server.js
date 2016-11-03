var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

//静态文件中间件 /lib/jquery/dist/jquery.js
app.use(express.static(path.resolve('public')));
//取出请求体并转成对象放在req.body
app.use(bodyParser.urlencoded({extended:true}));
//引入会话中间件 req.session
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx',
    cookie:{maxAge:1000000000*1000},
    store:new MongoStore({
        url:'mongodb://127.0.0.1/1608blog'
    })
}));
//加载模板引擎
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    next();
});
var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
app.use('/',index);
app.use('/user',user);
app.use('/article',article);

app.listen(9090)
