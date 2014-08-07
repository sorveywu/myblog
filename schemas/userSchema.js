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

module.exports = userShema;