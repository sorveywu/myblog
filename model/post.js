var mongoose = require('../connect');
var	Schema = mongoose.Schema;

var Comment = new Schema({
	email: {
		normal: String,
		md5: String
	},
	nickname: {type:String, default: ''},
	website: { type:String, default: ''},
	body: { type:String, default: ''},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		votes: Number,
		favs: Number
	}
})

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
	comments: [Comment],
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
	findByPage: function(page, len, cb){
		return this.find({}, 'title author category summary meta comments tags pic').skip((page-1)*len).sort({'meta.updateAt':-1}).limit(len).exec(cb);
	},
	findByCate: function(cate, page, len, cb){
		return this.find({'category.cname': cate}, 'title author category summary meta comments tags pic').skip((page-1)*len).sort({'meta.updateAt':-1}).limit(len).exec(cb);
	}
}


var PostModel = mongoose.model('post', PostSchema, 'post');

module.exports = PostModel;