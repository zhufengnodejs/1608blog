var express = require('express');
var Article = require('../model').Article;
//定义一个路由容器
var router = express.Router();
//配置一个子路由 res.locals对象才是真正渲染模板的对象
router.get('/',function(req,res){
   Article.find({},function(err,articles){
      res.render('index',{title:'首页',articles:articles});
   });
});
//导出此路由对象
module.exports = router;