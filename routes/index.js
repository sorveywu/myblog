var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
	Post.findAll(function(err, doc){

		doc.forEach(function(doc){
			doc.createAt = moment(doc.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
			doc.pic = '/images/pic.png';
		})

		res.render('home/index', {
	  		title: '首页 - 一个奔向工程师的程序员',
	  		article: doc,
	  		user: req.session.user
	  	})
	});
});

router.get('/post/:id', function(req, res){
	var id = req.params.id;
	res.send(id);
})

module.exports = router;
