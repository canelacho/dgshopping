module.exports = function(app) {

	var product = require('../models/product')


// GET ALL by PARAM

	search_subgroup_items = function(req, res) {

		product.find({ subgroup : req.params.id },function(err, products){

			console.log('----------')
			//console.log(products)
			//send an array!!!
			if(!err) {
				res.send([req.params, products])
			}
			else console.log('ERROR: ' + err)
		})
	}

	// API ROUTES
	app.get('/searching/:id', search_subgroup_items)
}