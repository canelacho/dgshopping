var mongoose = require('mongoose'),
		Schema = mongoose.Schema

var groupsubgroup = new Schema({
		groupname: String,
		subgroupitems: Array
})

module.exports = mongoose.model('groups', groupsubgroup)