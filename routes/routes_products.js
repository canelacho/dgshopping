module.exports = function(app) {

var product = require('../models/product'),
		fs = require('fs'),
		multer = require('multer'),
		storage = multer.diskStorage({
		  destination: function (req, file, cb) {
		    cb(null, './public/img/products/')
		  },
		  filename: function (req, file, cb) {
		    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
		  }
		}),
		upload = multer({ storage: storage })


	// GET ALL
	findProducts = function(req, res) {
		product.find(function(err, products){
			if(!err) res.send(products)
			else console.log('ERROR: ' + err)
		})
	}

	// GET ONE
	findById = function(req, res) {
		product.findById(req.params.id, function(err, product) {
			if(!err) res.send(product)
			else console.log('ERROR: ' + err)
		})
	}

	// POST
	addProduct = function(req, res, next) {

		console.log(req.body)
		
		var photos = []
		for(var i in req.files) {
		    photos.push(req.files[i].filename)
		}

		var newProduct = new product({
			group: req.body.group,
			subgroup: req.body.subgroup,
			name: req.body.name,
			price: req.body.price,
			description: req.body.description,
			date: Date.now(),
			exist: req.body.exist,
			outstanding: req.body.outstanding,
			photos: photos
		})

		newProduct.save(function(err) {
			if(!err) console.log('New Product saved!')
			else console.log('ERROR saving new product: ' + err)
		})

		// res.send(newProduct)
		res.render('private/dashboard')
	}


	// PUT
	editProduct = function(req, res) {

		product.findById(req.params.id, function(err, productFinded) {
			
			var photos = productFinded.photos
			if(req.files) {
				for(var i in req.files) {
			    photos.push(req.files[i].filename)
				}
			}

			productFinded.group = req.body.group,
			productFinded.subgroup = req.body.subgroup,
			productFinded.name = req.body.name,
			productFinded.price = req.body.price,
			productFinded.description = req.body.description,
			productFinded.exist = req.body.exist,
			productFinded.outstanding = req.body.outstanding,
			productFinded.photos = photos

			productFinded.save(function(err) {
				if(!err) console.log('productFinded updated!');
				else console.log('ERROR: ' + err);
			})

			res.send('Product updated!');
		})
	}

	// DELETE product on DB and all asociate photos on disk
	deleteProduct = function(req, res) {
		product.findById(req.params.id, function(err, productFinded) {
			for(var i in productFinded.photos) {
				console.log('is ' + productFinded.photos[i])
				fs.unlink('./public/img/products/'+productFinded.photos[i], function(err){
		      if(err) {
		      	console.log(err)
		      }
	      	console.log('file deleted successfully on row :' + i )
		  	}) 
			}

			productFinded.remove(function(err) {
				if(!err) {
					console.log('Product deleted!')
				}
				else console.log('ERROR: ' + err)
			})
		})
		
		res.send('Product deleted!')
	}

	// DELETE just photo selected on disk
	deletePhoto = function(req, res) {
	  fs.unlink('./public/img/products/'+req.params.photo,function(err){
      if(err) {
      	console.log(err)
      	return res.send(err)
      }
      console.log(req.params.product)

      // DELETE ITEM FROM ARRAY OF PRODUCT
      var productToDelete = req.params.product,
      		photoToDelete = req.params.photo

      product.findById(productToDelete, function(err, productFinded) {

      	var photos = productFinded.photos

				for(var i in photos) {
			    if(photos[i] === photoToDelete){ photos.splice(i,1); }
				}

				productFinded.photos = photos

				productFinded.save(function(err) {
					if(!err) console.log('productFinded updated!');
					else console.log('ERROR: ' + err);
				})
      })

      console.log('file deleted successfully')
    	res.send('File deleted successfully')
	  }) 
	}

	// API ROUTES
	app.get('/product', findProducts)
	app.get('/product/:id', findById)
	app.post('/product', upload.any(), addProduct)
	app.put('/product/:id', upload.any(), editProduct)
	app.delete('/product/:id', deleteProduct)

	app.delete('/product/:product/:photo', deletePhoto)
}