var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	email: String,
	password: String,
	nickname: String,
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

userSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

userSchema.statics = {
	fetch: function(cb){

	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}
}

module.exports = userSchema;