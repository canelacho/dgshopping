module.exports = function(app){

  	var item = require('../models/carrousel'),
    		fs = require('fs'),
    		multer = require('multer'),
    		storage = multer.diskStorage({
    		  destination: function (req, file, cb) {
    		    cb(null, './public/img/carrousel/')
    		  },
    		  filename: function (req, file, cb) {
    		    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    		  }
    		}),
    		upload = multer({ storage: storage })


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
  	var addItem = function(req, res, next) {
      console.log(storage.filename)
      console.log('req.files: ' + req.files)
      var photos = []
  		for(var i in req.files) {
  		    photos.push(req.files[i].filename)
  		}
      console.log('fotos: ' + photos)

  		var newItem = new item({
  			title: req.body.item_title,
  			detail: req.body.item_detail,
        picture: photos[0]
  		});

  		console.log(newItem);

  		newItem.save(function(err) {
  			if(!err) console.log('New item saved!')
  			else console.log('ERROR saving new item: ' + err);
  		});

      // res.send(newItem)
  		res.render('private/dashboard')
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
  app.post('/carrousel', upload.any(), addItem)
  app.put('/carrousel/:id', editItem)
  app.delete('/carrousel/:id', deleteItem)


}
