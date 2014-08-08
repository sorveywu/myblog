var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1/blog');
var	Schema = mongoose.Schema,
	crypto = require('crypto');


var UserSchema = new Schema({
	email: String,
	password: String,
	nickname: String,
	sex: String,
	age: Number,
	status: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}

})

	