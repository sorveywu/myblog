var fs = require('fs');
var path = require('path');
var uploadsPath = path.resolve('public/uploads') + '/';	//定义存储图片的路径

var handleFile = function(filename, file, targetDir){
	var targetFile = targetDir + filename;
	var fstream;

	fstream = fs.createWriteStream(targetFile);
	file.pipe(fstream);
	fstream.on('close', function(){
		console.log('Saved file: ' + filename);
	});
	fstream.on('error', function(err){
		console.log('ERROR while saving file '+ filename);
	})
}

var isDefined = function(str){
	return (typeof str != 'underfined' && null != str && '' != str);
}

var handleForm = function(req, res){
	var data = [];
	req.busboy.on('file', function(fieldname, file, filename){
		if(isDefined(filename)){
			var ext = path.extname(filename);
			var newFilename = (new Date() - 0) + ext;
			handleFile(newFilename, file, uploadsPath);
			
			var info = JSON.stringify({
				"originalName": filename,
                "name": newFilename,
                "url": '/public/uploads/' + newFilename,
                "type": ext,
                "state": "SUCCESS"
			})
			data.push(info);
		}
	})

	req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
        
    });

    req.busboy.on('finish', function() {
    	res.send(data);
    });

    req.pipe(req.busboy);
}

module.exports = handleForm;