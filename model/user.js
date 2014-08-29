var mongoose = require('../connect');
var	Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		normal: String,
		md5: String
	},
	password: {type: String, default: ''},
	nickname: String,
	sex: {type: Number, default: 1},
	age: {type:Number, default: 0},
	status: {type: Number, default: 1},
	description: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		},
		loginAt: {
			type: Date,
			default: Date.now()
		},
		loginIp: String
	}
})

UserSchema.statics = {
	findByEmail : function(email, cb){
		return this.findOne({'email.normal': email}).exec(cb);
	},
	findUser : function(user, cb){
		return this.findOne(user).exec(cb);
	},
	findAll: function(cb){
		return this.find().exec(cb);
	}
}

/*UserSchema.methods.speak = function(){
  	return '我的名字叫'+this.email;
}*/



var UserModel = mongoose.model('user', UserSchema, 'user');

module.exports = UserModel;

