var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var item = new Schema({
	title: String,
	detail: String,
	picture: String
});

module.exports = mongoose.model('carrousel', item);
