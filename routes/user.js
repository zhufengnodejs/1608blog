var express = require('express');
var router = express.Router();

router.get('/signUp',function(req,res){
    res.render('user/signup',{title:'注册'});
});
router.get('/signIn',function(req,res){
    res.render('user/signin',{title:'注册'});
});
router.get('/signOut',function(req,res){
    res.redirect('/');
});

module.exports = router;