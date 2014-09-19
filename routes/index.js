var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var Cate = require('../model/category')
var moment = require('moment');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res) {
	var page = req.query.page ? req.query.page : 1;	//页码
	var len = 10;	//每页显示多少条
	Post.count(function(err, total){
		Post.findByPage(page, len, function(err, doc){
			doc.forEach(function(doc){
				doc.createAt = moment(doc.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
			})
			Cate.findAllCate(function(err, cates){				
				res.render('home/index', {
			  		title: '首页 - 一个奔向工程师的程序员',
			  		page: page,
					pages: Math.ceil(total/len),
					isFirstPage: (page - 1) == 0,
					isLastPage: ((page - 1) * len + doc.length) == total,
			  		article: doc,
			  		cates: cates,
			  		user: req.session.user
			  	})
			})
		});
	})
});

router.get('/category/:cate', function(req, res) {
	var cate = req.params.cate;
	var page = req.query.page ? req.query.page : 1;	//页码
	var len = 10;	//每页显示多少条
	Post.count(function(err, total){
		Post.findByCate(cate, page, len, function(err, doc){
			doc.forEach(function(doc){
				doc.createAt = moment(doc.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
			})
			Cate.findAllCate(function(err, cates){				
				res.render('home/index', {
			  		title: '首页 - 一个奔向工程师的程序员',
			  		page: page,
					pages: Math.ceil(total/len),
					isFirstPage: (page - 1) == 0,
					isLastPage: ((page - 1) * len + doc.length) == total,
			  		article: doc,
			  		cates: cates,
			  		user: req.session.user
			  	})
			})
		});
	})
});

router.get('/post/:id', function(req, res){
	var id = req.params.id;
	Post.findById(id, function(err, doc){
		if(err){
			res.render('404');
		}else{
			doc.createAt = moment(doc.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
			doc.comments.forEach(function(vo){
				vo.createAt = moment(vo.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
			})
			doc.comments = doc.comments.reverse();	//数组倒序反转
			Cate.findAllCate(function(err, cates){
				res.render('home/post', {
					title: doc.title + ' - 一个奔向工程师的程序员',
			  		doc: doc,
			  		cates: cates,
			  		user: req.session.user
				})
			})
		}
	})
})

router.post('/comment-add', function(req, res){
	var email_md5 = crypto.createHash('md5'),
		id = req.body.id;
	var comment = {
		email: {
			normal:	req.body.email,
			md5: email_md5.update(req.body.email).digest('hex')
		},
		nickname: req.body.nickname,
		body: req.body.comment
	}
	Post.update({_id: id}, {$push:{comments: comment}}, function(err, doc){
		if(err){
			return console.log(err);
		}else{
			comment.createAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			res.send(comment);
		}
	})
})

module.exports = router;
