var fs = require('fs');
var path = require('path');
var uploadsPath = path.resolve('public/uploads') + '/';	//定义存储图片的路径
var data = [];
var config = {
	ext: ['.png', '.gif', '.jpg', '.jpeg'],
	size: 2*1024*1024,
	files: 4
}

var handleFile = function(filename, file, targetDir){
	var targetFile = targetDir + filename;
	var fstream;

	fstream = fs.createWriteStream(targetFile);
	file.pipe(fstream);
	file.on('data', function(info){
		
	})

	fstream.on('close', function(){		
		console.log('Saved file: ' + filename);
	});
	fstream.on('error', function(err){
		console.log('ERROR while saving file '+ filename);
	})
}

var isDefined = function(str){
	return (typeof str != 'undefined' && null != str && '' != str);
}

var handleForm = function(req, res){
	req.busboy.on('file', function(fieldname, file, filename){	//监听file表单
		var ext = path.extname(filename);

		if(isDefined(filename)){	//检查是否有文件上传
			if(config.ext.inArray(ext)){	//检查文件类型
				var newFilename = (new Date() - 0) + ext;
				handleFile(newFilename, file, uploadsPath);
				
				/*var info = JSON.stringify({
					"originalName": filename,
	                "name": newFilename,
	                "url": '/public/uploads/' + newFilename,
	                "type": ext,
	                "state": "SUCCESS"
				})*/
				var info = {
					"originalName": filename,
	                "name": newFilename,
	                "url": '/public/uploads/' + newFilename,
	                "type": ext,
	                "state": "SUCCESS"
				}
				data.push(info);
			}else{
				return res.send(getError(-140));
			}
		}else{
			return	res.send(getError(-100));
		}
	})

	req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {	
        console.log('key:' + key +',value:' + value + ',keyTruncated:' + keyTruncated + ',valueTruncated:' + valueTruncated);
    });

    req.busboy.on('finish', function() {
    	res.send(data);
    });

    req.pipe(req.busboy);
}

var getError = function(type, file){
	var err = {};
	switch(type){
		case -100:
			err.type = -100;
			err.msg = '没有选择上传文件！';
			break;
		case -110: 
			err.type = -110; 
			err.msg = '上传的文件数量已经超出系统限制的个文件！'; 
			break; 
		case -120: 
			err.type = -120; 
			err.msg = '文件  大小超出系统限制的大小！';
			break; 
		case -130: 
			err.type = -130; 
			err.msg = '文件大小异常'; 
			break; 
		case -140: 
			err.type = -140; 
			err.msg = '文件类型不正确！'; 
			break; 
	}
	
	return err;
}

Array.prototype.inArray = function (value){	
	for (var i=0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
};

module.exports = handleForm;