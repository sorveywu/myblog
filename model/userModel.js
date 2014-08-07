var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema');
var userModel = mongoose.model('user', userShema);

userModel.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

userModel.statics = {
	fetch: function(cb){

	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}
}

module.exports = userModel;