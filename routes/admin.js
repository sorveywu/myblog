/**
 * 后台文章发布方法
 * Powered by SorveyWu
 */
var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var Category = require('../model/category');
var moment = require('moment');

router.get('/', checkLogin);
router.get('/', function(req, res) {    //后台首页
    res.render("admin/index", {

    });
});
router.get('/post-new', checkLogin);
router.get('/post-new', function(req, res){     //文章添加页
    Category.findAllCate(function(err, docs){
        res.render('admin/post_new',{
            title: '添加文章',
            cate: docs
        })
    })
})
router.post('/post-add', checkLogin)
router.post('/post-add', function(req, res){    //文章添加处理
    var tagStr = req.body.tags,
        summaryStr = req.body.summary,
        cateStr = req.body.category;

    var summary = summaryStr.substr(0, 55) + '...',
        tagArr = tagStr.split(','),
        cateArr = cateStr.split('/');

    var data = {
        title: req.body.title,
        body: req.body.body,
        author: {
            email: req.session.user.email.normal,
            nickname: req.session.user.nickname
        },
        category: {
            name: cateArr[0],
            cname: cateArr[1]
        },
        summary: summary,
        tags: tagArr,
        pic: req.body.pic
    }
    Post.create(data, function(err, doc){
        if(err){
            console.log(err);
        }else{
            res.redirect('post-new');
        }
    })
})
router.get('/post-list', checkLogin);
router.get('/post-list', function(req, res){
    var cate = req.query.cate;
    if(cate){
        Post.find({'category.cname': cate},function(err, docs){
            if(err){
                console.log(err);
            }else{
                docs.forEach(function(doc){
                    doc.createAt = moment(doc.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
                    doc.pic = '/images/pic.png';
                })
                res.render('admin/post_list', {
                    docs: docs
                })
            }
        })
    }else{
        Post.findAll(function(err, docs){
            if(err){
                console.log(err);
            }else{
                docs.forEach(function(doc){
                    doc.createAt = moment(doc.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
                    doc.pic = '/images/pic.png';
                })
                res.render('admin/post_list', {
                    docs: docs
                })
            }
        })
    }
})
//文章编辑
router.get('/post-edit', checkLogin);
router.get('/post-edit', function(req, res){
    var id = req.query.id;
    Post.findById(id, function(err, doc){
        if(err){
            res.render('404');
        }else{
            doc.tag = doc.tags.join();
            Category.findAllCate(function(err, cates){
                res.render('admin/post_edit', {
                    doc: doc,
                    cates: cates
                })
            })
        }
    })
})
//文章更新处理
router.post('/post-update', checkLogin);
router.post('/post-update', function(req, res){
    var id = req.body.postid,
        tagStr = req.body.tags,
        summaryStr = req.body.summary,
        cateStr = req.body.category;

    var summary = summaryStr.substr(0, 55) + '...',
        tagArr = tagStr.split(','),
        cateArr = cateStr.split('/');

    var data = {
        title: req.body.title,
        body: req.body.body,
        author: {
            email: req.session.user.email.normal,
            nickname: req.session.user.nickname
        },
        category: {
            name: cateArr[0],
            cname: cateArr[1]
        },
        summary: summary,
        tags: tagArr
    }

    Post.update({_id: id}, data, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('back');
        }
    })
})
//文章删除
router.get('/post-delete', function(req, res){
    var id = req.query.id;
    Post.remove({_id : id}, function(err, doc){
        if(err){
            return console.log(err);
        }else{
            res.redirect('post-list');
        }
    })
})
//分类目录
router.get('/cate-list', checkLogin);
router.get('/cate-list', function(req, res){
    Category.findAllCate(function(err, docs){
        docs.forEach(function(doc){
            doc.createAt = moment(doc.meta.createAt).format('YYYY-MM-DD HH:mm:ss');
        })
        res.render('admin/cate_list', {
            docs: docs
        })
    })
})

//添加分类
router.post('/cate-add', checkLogin);
router.post('/cate-add', function(req, res){
    var parent = req.body.parent;
    var arr = parent.split('_');
    var deepth = (arr[0] == '0') ? 0 : 1;
    if(arr[0] == '0'){
        arr[1] = '';
    }

    var data = {
        name: req.body.name,
        cname: req.body.cname,
        deepth: deepth,
        parent: {
            pid: arr[0],
            pname: arr[1]
        },
        description: req.body.description,
        status : req.body.status,
        meta:{
            createAt: Date.now(),
            updateAt: Date.now()
        },
        author: {
            email: req.session.user.email.normal,
            nickname: req.session.user.nickname
        }
    }

    Category.create(data, function(err, doc){
        if(err){
            console.log(err);
        }else{
            res.redirect('cate-list');
        }
    })
})
//删除分类
router.get('/cate-delete', checkLogin);
router.get('/cate-delete', function(req, res){
    var id = req.query.id;
    Category.remove({_id: id}, function(err, doc){
        if(err){
            console.log(err);
        }else{
            res.redirect('cate-list');
        }
    })
})
//修改分类
router.get('/cate-edit', checkLogin);
router.get('/cate-edit', function(req, res){
    var id = req.query.id;
    if(!id){
        res.send('404 test');
    }else{
        Category.findById(id, function(err, doc){
            if(err){
                console.log(err);
            }else{
                Category.findAllCate(function(err, result){
                    if(err){
                        console.log(err);
                    }else{
                        res.render('admin/cate_edit', {
                            doc: doc,
                            result: result
                        })
                    }
                })
            }
        })
    }
})
//分类更新处理
router.post('/cate-update', checkLogin);
router.post('/cate-update', function(req, res){
    var id = req.body.cateid;
    var parent = req.body.parent;
    var arr = parent.split('_');
    var deepth = (arr[0] == '0') ? 0 : 1;
    if(arr[0] == '0'){
        arr[1] = '';
    }

    var data = {
        name: req.body.name,
        cname: req.body.cname,
        deepth: deepth,
        parent: {
            pid: arr[0],
            pname: arr[1]
        },
        description: req.body.description,
        status : req.body.status,
        meta:{
            createAt: Date.now(),
            updateAt: Date.now()
        },
        author: {
            email: req.session.user.email.normal,
            nickname: req.session.user.nickname
        }
    }
    Category.update({_id: id}, data, function(err, doc){
        if(err){
            console.log(err);
        }else{
            res.redirect('cate-list');
        }
    })
})

function checkLogin(req, res, next){    //判断用户是不是已登录
    if(!req.session.user){
        req.flash('error', '您还没有登录！');
        res.redirect('/user/login');
    }
    next();
}

module.exports = router;
