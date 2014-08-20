/**
 * 后台文章发布方法
 * Powered by SorveyWu
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render("admin/index", {

	});
});

router.get('/post-new', function(req, res){
	res.render('admin/post_new',{
		title: '添加文章'
	})
})

module.exports = router;
