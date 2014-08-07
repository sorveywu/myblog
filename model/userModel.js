var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema');
var userModel = mongoose.model('user', userSchema);

module.exports = userModel;