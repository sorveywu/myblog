var express = require('express');
var router = express.Router();

var User = require('../model/userModel');

/* GET users listing. */
router.get('/', function(req, res) {
  	res.send('respond with a resource');
});

router.get('/login', function(req, res, next){
	res.render('login', {
		title: '用户登录'
	});
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
