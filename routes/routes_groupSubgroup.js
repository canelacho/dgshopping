module.exports = function(app) {
	var group = require('../models/groupsubgroup')

	// GET ALL
	findGroups = function(req, res) {
		group.find({}, function(err, groups) {
			if(!err) { 
				console.log('Groups finded')
				res.send(groups)
			}
			else console.log('ERROR finding groups: ' + groups)
			
		})
	}

	// GET BY ID
	findGroup = function(req, res) {
		group.findById(req.params.id, function(err, group) {
			if(!err) console.log('Group finded')
			else console.log('ERROR, group no finded ' + err)
			res.send(group)
		})
	}

	// POST 
	addGroup = function(req, res, next) {

		// console.log('info on body: ' + JSON.stringify(req.body, null, 2) )
		console.log(req.body)
		nameGroup = new group({
				groupname: req.body.group,
				subgroupitems: req.body.subgroup
		})

		nameGroup.save(function(err) {
			if(!err) console.log('New Group saved!')
			else console.log('ERROR saving new group: ' + err)
		})

		res.send(nameGroup)

	}

	// UPDATE 
	editGroup = function(req, res) {
		console.log('entramos al update del grupo')
		group.findById(req.params.id, function(err, groupFinded) {
			console.log(groupFinded)
			console.log(req.body.group)
			groupFinded.groupname = req.body.group,
			groupFinded.subgroupitems = req.body.subgroup

			groupFinded.save(function(err) {
				if(!err) console.log('Group successfully updated')
				else console.log('ERROR updating group ' + err)
			})

			res.send('Gropu Update')
		})
	}


	// DELETE group and subgroup
	deleteGroup = function(req, res) {
		console.log(req.params.id)
		group.findById(req.params.id, function(err, groupFinded) {
			console.log(groupFinded)
			groupFinded.remove(function(err) {
				if(!err) console.log('Group and subGroup deleted!');
				else console.log('ERROR: ' + err);
			})
		})
		res.send('Group and subGroup deleted!')
	}


	// API ROUTES
	app.get('/group', findGroups)
	app.get('/group/:id', findGroup)
  app.post('/group', addGroup)
	app.put('/group/:id', editGroup)
  app.delete('/group/:id', deleteGroup)
}