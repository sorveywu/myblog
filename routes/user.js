var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res) {
	res.send('user page');
});

router.get('/login', checkNotLogin);
router.get('/login', function(req, res){
	res.render('home/login', {
		title: '用户登录',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	})
})
router.post('/login', checkNotLogin);
router.post('/login', function(req, res){
	var email = req.body.email,
		password = req.body.password,
		email_md5 = crypto.createHash('md5'),
		pwd_md5 = crypto.createHash('md5');
	var user = {
		email: {
			normal: email,
			md5: email_md5.update(email).digest('hex')
		},
		password: pwd_md5.update(password).digest('hex')
	}
	var count = User.findOne(user, 'email meta', function(err, doc){
		if(doc){
			req.session.user = doc;
			res.redirect('/admin');
		}else{
			req.flash('error', '用户名或密码错误！');
			res.redirect('login');
		}
	})


})

router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res){
	res.render('home/reg', {
		title: '用户注册',
		user: req.session.user,
      	error: req.flash('error').toString()
	})
})
router.post('/reg', checkNotLogin);
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
router.get('/logout', checkLogin);
router.get('/logout', function(req, res){
	req.session.user = null;
	res.redirect('/');
})

function checkLogin(req, res, next){	//判断用户是不是已登录
	if(!req.session.user){
		req.flash('error', '您还没有登录！');
		res.redirect('login');
	}
	next();
}

function checkNotLogin(req, res, next){
	if(req.session.user){
		req.flash('error', '您已登录，请注销后再进行操作！');
		res.redirect('/');	//返回之前的页面
	}
	next();
}

module.exports = router;
