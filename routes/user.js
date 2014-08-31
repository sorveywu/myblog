var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var moment = require('moment');

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
	var count = User.findOne(user, 'email nickname meta', function(err, doc){
		if(doc){
			req.session.user = doc;
			res.redirect('/');
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
//用户列表
router.get('/list', checkLogin);
router.get('/list', function(req, res){
	User.findAll(function(err, docs){
		if(err){
			res.redirect('404');
		}else{
			docs.forEach(function(doc){
				doc.createAt = moment(doc.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
				doc.updateAt = moment(doc.meta.updateAt).format('YYYY-MM-DD HH:mm:ss');
			})
			res.render('admin/user_list', {
				user: docs
			});
		}
	})
})
//修改用户
router.get('/edit', checkLogin);
router.get('/edit', function(req, res){
	var id = req.query.id;
	User.findOne({_id: id}, function(err, doc){
		if(err){
			res.redirect('404');
		}else{
			res.render('admin/user_edit', {
				user: doc
			})
		}
	})
})
//用户更新
router.post('/update', checkLogin);
router.post('/update', function(req, res){
	var email_md5 = crypto.createHash('md5'),
		pwd_md5 = crypto.createHash('md5'),
		id = req.body.userid;
	var data = {
		email: {
			normal: req.body.email,
			md5: email_md5.update(req.body.email).digest('hex')
		},
		nickname: req.body.nickname,
		sex: req.body.sex,
		age: req.body.age,
		status: req.body.status,
		description: req.body.description,
		meta: {
			updateAt: Date.now()
		}
	};
	User.update(data, function(err, doc){
		if(err){
			res.redirect('404');
		}else{
			res.redirect('back');
		}
	})
})
//添加用户
router.get('/new', checkLogin);
router.get('/new', function(req, res){
	res.render('admin/user_new',{})
})
//用户新增
router.post('/add', checkLogin);
router.post('/add', function(req, res){
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
							normal: req.body.email,
							md5: email_md5.update(req.body.email).digest('hex')
						},
						password: pwd_md5.update(password).digest('hex'),
						nickname: req.body.nickname,
						sex: req.body.sex,
						age: req.body.age,
						status: req.body.status,
						description: req.body.description,
						meta: {
							updateAt: Date.now()
						}
					};
					User.create(data, function(err, doc){
						if(err){
							return console.log(err);
						}else{
							res.redirect('list');
						}
					});
				}
			}
		})
	}
})
//用户删除
router.get('/delete', function(req, res){
	var id = req.query.id;
	User.remove({_id: id}, function(err, doc){
		if(err){
			res.send('error');
		}else{
			if(doc){
				res.redirect('list');
			}else{
				res.render('404');
			}
		}
	})
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
