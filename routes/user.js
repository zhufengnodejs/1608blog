var express = require('express');
var User = require('../model').User;
var multer = require('multer');
//dest 指上传的文件的保存路径
var upload = multer({ dest: 'public/uploads/' })
var router = express.Router();

router.get('/signup',function(req,res){
    res.render('user/signup',{title:'注册'});
});
/**
 * 这是一个中间件，可以解析请求体，把文本类的字段放在req.body上，把文件对象放在req.file
 */
router.post('/signup',upload.single('avatar'),function(req,res){
   console.log(req.file);
   var user = req.body;
   user.avatar = '/uploads/'+req.file.filename;
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
router.post('/signin',function(req,res){
    var user = req.body;
    User.findOne({username:user.username}).then(function(doc){
        if(doc){
            if(doc.password  == user.password){
                req.session.user = doc;
                res.redirect('/');
            }else{
                res.redirect('back');
            }
        }else{
            res.redirect('/user/signup');
        }
    },function(error){
        res.redirect('back');
    });
});
router.get('/signout',function(req,res){
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;