module.exports = function(app){

	var user = require('../models/users')

	// GET ALL
	findUsers = function(req, res) {
		user.find(function(err, users){
			if(!err) res.send(users)
			else console.log('ERROR: ' + err)
		})
	}

	// GET ONE
	findById = function(req, res) {
		user.findById(req.params.id, function(err, user) {
			if(!err) res.send(user)
			else console.log('ERROR: ' + err)
		})
	}

	// POST
	addUser = function(req, res) {

		var newUser = new user({
			name: req.body.name,
			password: req.body.password
		})

		console.log(newUser)

		newUser.save(function(err) {
			if(!err) console.log('New User saved!')
			else console.log('ERROR saving new user: ' + err)
		})

		res.send(newUser)
	}

	// PUT
	editUser = function(req, res) {
		user.findById(req.params.id, function(err, userFind) {
			userFind.name = req.body.name,
			userFind.password = req.body.password

			userFind.save(function(err) {
				if(!err) console.log('User updated!');
				else console.log('ERROR: ' + err);
			})

			res.send('User updated!');
		})
	}
	// DELETE
	deleteUser = function(req, res) {
		user.findById(req.params.id, function(err, user) {
			user.remove(function(err) {
				if(!err) console.log('User deleted!');
				else console.log('ERROR: ' + err);
			})
		})
		res.send('User deleted!')
	}

	// API ROUTES
	app.get('/user', findUsers)
	app.get('/user/:id', findById)
	app.post('/user', addUser)
	app.put('/user/:id', editUser)
	app.delete('/user/:id', deleteUser)


} 