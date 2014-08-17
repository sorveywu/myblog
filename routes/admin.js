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

router.get('/add-post', function(req, res){
	res.send('add-post');
})

module.exports = router;
