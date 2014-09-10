var mongoose = require('../connect');
var	Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	category: {
		name: String,
		cname: String
	},
	body: String,
	summary: String,
	author: {
		email: String,
		nickname: String
	},
	comments: [String],
	tags: [String],
	pic: String,
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
		return this.find({}, 'title author category summary meta comments tags pic').exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	},
	countPost: function(name){
		this.count({'category' : '娱乐'}, function(err, doc){
			return doc;
		})
	}
}

var PostModel = mongoose.model('post', PostSchema, 'post');

module.exports = PostModel;