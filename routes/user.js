var express = require('express');
var User = require('../model').User;
var router = express.Router();

router.get('/signup',function(req,res){
    res.render('user/signup',{title:'注册'});
});
router.post('/signup',function(req,res){
   var user = req.body;
   User.create(user).then(function(doc){
       //当注册成功之后把保存后的用户对象保存在session中
       req.session.user = doc;
       res.redirect('/');
   },function(error){
       res.redirect('back');
   });
});
router.get('/signin',function(req,res){
    res.render('user/signin',{title:'注册'});
});
router.get('/signout',function(req,res){
    res.redirect('/');
});

module.exports = router;