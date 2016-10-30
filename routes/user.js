var express = require('express');
var router = express.Router();

router.get('/signUp',function(req,res){
    res.send('注册');
});
router.get('/signIn',function(req,res){
    res.send('登录');
});
router.get('/signOut',function(req,res){
    res.send('退出');
});

module.exports = router;