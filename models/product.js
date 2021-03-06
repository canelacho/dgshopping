var mongoose = require('mongoose'),
		Schema = mongoose.Schema

var product = new Schema({
	group: String,
	subgroup: String,
	name: String,
	price: Number,
	description: String,
	date: Date,
	exist: { type: Boolean, "default" : false},
	outstanding: { type: Boolean, "default" : false},
	photos: { type : Array , "default" : [] }
})

module.exports = mongoose.model('products', product)