var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	category: String,
	body: String,
	summary: String,
	author: String,
	comments: [String],
	tags: [String],
	click: {
		type: Number,
		default: 0
	},
	status: {
		type: Number,
		default: 1
	},
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

PostSchema.statics = {
	findAll : function(cb){
		return this.find({}, 'title author summary meta comments tags').exec(cb);
	}
}

var PostModel = mongoose.model('post', PostSchema, 'post');

module.exports = PostModel;