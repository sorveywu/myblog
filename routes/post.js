var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send("asdasd");
});

router.get('/login', function(req, res){
	res.render('login', {
		title: '用户登录',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	})
})

module.exports = router;
