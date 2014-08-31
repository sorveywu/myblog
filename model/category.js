var mongoose = require('../connect');
var Schema = mongoose.Schema;


var CateSchema = new Schema({
	name: String,
	cname: String,
	deepth: {
		type: Number,
		default: 0
	},
	parent: {
		pid: String,
		pname: String
	},
	description: String,
	author: {
		email : String,
		nickname: String
	},
	status:{
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

CateSchema.statics = {
	findAllCate: function(cb){
		return this.find({}, 'name cname author status meta').exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}
}

var CateModel = mongoose.model('category', CateSchema, 'category');
module.exports = CateModel;