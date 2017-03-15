module.exports = function(app) {

	var privatePath = '/app/',
			User = require('../models/users')


	// Validate Login
	validateLogin = function(req, res) {
		User.find({ 'name':req.body.user, 'password':req.body.password }, function(err, userFinded){
			console.log(userFinded)
			if(!err & userFinded[0] !== undefined) {
				req.session.user_id = userFinded[0]._id;
				console.log(req.session)
				res.redirect(privatePath+'dashboard')
			} else {
				console.log('ERROR starting session: ' + err)
				res.redirect('/private-access')
			}
		})
	}

	closeSession = function(req, res) {
		req.session = null;
		console.log(req.session)
		res.redirect('/private-access');
	}

	// General View Dashboard
	generalView = function(req, res) {
		res.render('private/dashboard')
	}

	//newProduct
	newProduct = function(req, res) {
		res.render('private/new_product')
	}



	// API ROUTES

	//Validate login
	app.post('/validate_login', validateLogin)

	// Load dashboard admin user on app
	app.get(privatePath+'dashboard', generalView)
	// Close session app
	app.get(privatePath+'closeSession', closeSession)

	// Create new product
	app.get(privatePath+'new_product', newProduct)

}