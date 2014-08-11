var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('user page');
});

router.get('/login', function(req, res){
	res.render('login', {
		title: '用户登录',
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	})
})

router.post('/login', function(req, res){
	var email = req.body.email,
		password = req.body.password,
		email_md5 = crypto.createHash('md5'),
		pwd_md5 = crypto.createHash('md5');
	var data = {
		'email.normal': email,
		'password': pwd_md5.update(password).digest('hex')
	}
	var count = User.count(data, function(err, result){
		if(result == 1){
			req.flash('success', '用户注册成功，请登录！');
			res.redirect('login');
		}else{
			req.flash('error', '用户名或密码错误！');
			res.redirect('login');
		}
	})

	
})

router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res){
	res.render('reg', {
		title: '用户注册',
      	error: req.flash('error').toString()
	})
})

router.post('/reg', function(req, res){
	var email = req.body.email,
		password = req.body.password,
		repassword = req.body.repassword;
	if(!email){
		req.flash('error', '邮箱未填写');
		res.redirect('reg');
	}else if(password != repassword){
		req.flash('error', '密码与确认密码不一致！');
		res.redirect('reg');	
	}else{
		User.findByEmail(email, function(err, doc){
			if(err){
				return callback(err);
			}else{
				if(doc){
					req.flash('error', '该邮箱已注册！');
					res.redirect('reg');
				}else{
					var email_md5 = crypto.createHash('md5'),
						pwd_md5 = crypto.createHash('md5');
					var data = {
						email: {
							normal: email,
							md5: email_md5.update(email).digest('hex')
						},
						password: pwd_md5.update(password).digest('hex')
					}
					User.create(data);
					req.flash('success', '用户注册成功，请登录！');
					res.redirect('login');
				}
			}
		})
	}
})

function checkLogin(req, res, next){
	if(!req.session.user){
		req.flash('error', '用户未登录');
		res.redirect('login');
	}
	next();
}

function checkNotLogin(req, res, next){
	if(req.session.user){
		req.flash('error', '已登录');
		res.redirect('back');	//返回之前的页面
	}
	next();
}

module.exports = router;
