var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('127.0.0.1:27017/blog');

var User = require('../model/userModel');

/* GET users listing. */
router.get('/', function(req, res) {
  	res.send('respond with a resource');
});

router.get('/login', function(req, res, next){
	User.findById('53e32f95e5b508f7de9b710c', function(err, result){
		if(err){
			console.log(err);
		}else{
			res.send(result);
		}
	})
})

router.get('/reg', function(req, res, next){
	res.render('login', {
		title: '用户登录'
	});
})

router.post('/login', function(res, req){
	var username = req.body.username,
		password = req.body.password;

})

module.exports = router;
