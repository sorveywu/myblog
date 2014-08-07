var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userShema = new schema({
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

userShema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
})

userShema.statics = {
	fetch: function(cb){

	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}
}

module.exports = userShema;