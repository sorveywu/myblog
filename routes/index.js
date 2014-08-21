var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
	Post.findAll(function(err, docs){
		docs.forEach(function(doc){
			doc.meta.createAt = moment(doc.meta.createAt).format('"MM-DD-YYYY HH:mm:ss');
		})


		res.render('home/index', {
	  		title: '首页 - 一个奔向工程师的程序员',
	  		article: docs,
	  		user: req.session.user
	  	})
	});
});

module.exports = router;
