/**
 * 后台文章发布方法
 * Powered by SorveyWu
 */
var express = require('express');
var router = express.Router();
var Post = require('../model/post');

router.get('/', checkLogin);
router.get('/', function(req, res) {	//后台首页
	res.render("admin/index", {

	});
});
router.get('/post-new', checkLogin);
router.get('/post-new', function(req, res){		//文章添加页
	res.render('admin/post_new',{
		title: '添加文章'
	})
})
router.post('/post-add', checkLogin)
router.post('/post-add', function(req, res){	//文章添加处理
	var tagArr = req.body.tags;
	var tagArr = tagArr.split(',');
	var str = req.body.summary;
	var summary = str.substr(0, 55) + '...';
	var data = {
		title: req.body.title,
		body: req.body.body,
		author: req.session.user.email.normal,
		category: req.body.category,
		summary: summary,
		tags: tagArr
	}
	Post.create(data, function(err, doc){
		if(err){
			console.log(err);
		}else{
			console.log(doc);
		}
	})
})
router.get('/post-list', checkLogin);
router.get('/post-list', function(req, res){
	res.render('admin/post_list', {

	})
})

function checkLogin(req, res, next){	//判断用户是不是已登录
	if(!req.session.user){
		req.flash('error', '您还没有登录！');
		res.redirect('/user/login');
	}
	next();
}

module.exports = router;
