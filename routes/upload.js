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

/*router.post('/upload-pic', function(req, res){
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var filesize = 0;
        var ext = path.extname(filename);
        var newFilename = (new Date() - 0) + ext;
        fstream = fs.createWriteStream(uploadsPath + newFilename);
        file.on('data', function (data) {
            filesize = data.length;
        });
        file.on('error', function(data){
        	res.send('error');
        })
        fstream.on('close', function () {
            res.send(JSON.stringify({
                "originalName": filename,
                "name": newFilename,
                "url": '/public/uploads/' + newFilename,
                "type": ext,
                "size": filesize,
                "state": "SUCCESS"
            }));
        });
        file.pipe(fstream);
    });
})*/

 module.exports = router;