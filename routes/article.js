var express = require('express');
var Article = require('../model').Article;
var auth = require('../auth');
var router = express.Router();
router.get('/add',auth, function (req, res) {
    res.render('article/add', {title: '发表文章',article:{}});
});
router.post('/add',auth, function (req, res) {
    var oldId = req.query._id;
    var article = req.body;
    if (oldId) {
        Article.update({_id:oldId},article).then(function(result){
            res.redirect('/article/detail/'+oldId);
        },function(err){
            res.redirect('back');
        });
    } else {
        //user作为外键，指向当前登录用户集合记录的主键
        article.user = req.session.user._id;
        Article.create(article).then(function (doc) {
            res.redirect('/');
        }, function (error) {
            res.redirect('back');
        });
    }

});
router.get('/detail/:id', function (req, res) {
    var id = req.params.id;
    Article.findById(id).then(function (article) {
        res.render('article/detail', {title: '文章详情', article: article});
    })
});

router.get('/delete/:id',auth, function (req, res) {
    var id = req.params.id;
    Article.remove({_id: id}).then(function () {
        res.redirect('/');
    }, function () {
        res.redirect('back');
    });
});
router.get('/update/:id',auth, function (req, res) {
    var id = req.params.id;
    Article.findById(id).then(function (article) {
        res.render('article/add', {title: '修改文章', article: article});
    });
});
module.exports = router;