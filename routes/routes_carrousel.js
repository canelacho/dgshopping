module.exports = function(app){

  	var item = require('../models/carrousel')

  	// GET ALL
  	var findItems = function(req, res) {
  		item.find(function(err, items){
  			if(!err) res.send(items)
  			else console.log('ERROR: ' + err)
  		})
  	}

  	// GET ONE
  	var findById = function(req, res) {
  		item.findById(req.params.id, function(err, item) {
  			if(!err) res.send(item)
  			else console.log('ERROR: ' + err)
  		})
  	}

  	// POST
  	var addItem = function(req, res) {

      console.log("llegando con la data postman: " +req.body.title)
  		var newItem = new item({
  			title: req.body.title,
  			detail: req.body.detail,
        picture: req.body.picture
  		});

  		console.log(newItem);

  		newItem.save(function(err) {
  			if(!err) console.log('New item saved!')
  			else console.log('ERROR saving new item: ' + err);
  		});

  		res.send(newItem);
  	}

  	// PUT
  	var editItem = function(req, res) {

  		item.findById(req.params.id, function(err, itemFinded) {
  			itemFinded.title = req.body.title,
  			itemFinded.detail = req.body.detail,
  			itemFinded.picture = req.body.picture,

  			itemFinded.save(function(err) {
  				if(!err) console.log('Item updated!')
  				else console.log('ERROR: ' + err)
  			});

  			res.send('Item updated!');
  		});
  	}

  // DELETE
  var deleteItem = function(req, res) {
    item.findById(req.params.id, function(err, itemFinded) {
      itemFinded.remove(function(err) {
        if(!err) console.log('Item deleted!')
        else console.log('ERROR: ' + err)
      })
    })
    res.send('Item deleted!');
  }


  // API ROUTES
  app.get('/carrousel', findItems)
  app.get('/carrousel/:id', findById)
  app.post('/carrousel', addItem)
  app.put('/carrousel/:id', editItem)
  app.delete('/carrousel/:id', deleteItem)


}
