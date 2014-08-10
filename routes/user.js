var express = require('express');
var router = express.Router();

var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('user page');
});

router.get('/login', function(req, res, next){
	res.render('login', {
		title: '用户登录'
	})
})

router.post('/login', function(req, res){
	var username = req.body.username,
		password = req.body.password;
	res.redirect('login');
})

module.exports = router;
