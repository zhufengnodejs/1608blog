var express = require('express');
var path = require('path');
var app = express();
//静态文件中间件 /lib/jquery/dist/jquery.js
app.use(express.static(path.resolve('public')));

//加载模板引擎
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);

var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
app.use('/',index);
app.use('/user',user);
app.use('/article',article);

app.listen(9090)
