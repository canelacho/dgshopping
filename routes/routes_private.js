module.exports = function(app) {

	//newProduct
	newProduct = function(req, res) {
		res.render('private/new_product')
	}

	// API ROUTES
	app.get('/new_product', newProduct)

}