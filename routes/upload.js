/**
 * 图片、附件上传方法
 * Powered by Sorvey.Wu
 */
var express = require('express');
var router = express.Router();
var uploadHandler = require('../model/upload');

router.get('/upload', function(req, res){
    res.render('admin/upload');
})

router.post('/upload-pic', uploadHandler);

module.exports = router;