var mongoose = require('mongoose'),
		Schema = mongoose.Schema

var user = new Schema({
	name: String,
	password: String
})

module.exports = mongoose.model('users', user)