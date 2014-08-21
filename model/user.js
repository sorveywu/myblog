var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		normal: String,
		md5: String
	},
	password: String,
	nickname: String,
	sex: Number,
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

UserSchema.statics = {
	findByEmail : function(email, cb){
		return this.findOne({'email.normal': email}).exec(cb);
	},
	findUser : function(user, cb){
		return this.findOne(user).exec(cb);
	}
}

/*UserSchema.methods.speak = function(){
  	return '我的名字叫'+this.email;
}*/



var UserModel = mongoose.model('user', UserSchema, 'user');

module.exports = UserModel;

