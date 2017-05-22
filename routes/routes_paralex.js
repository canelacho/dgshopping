module.exports = function(app) {
	var fs = require('fs'),
			multer = require('multer'),
			storage = multer.diskStorage({
  		  destination: function (req, file, cb) {
  		    cb(null, './public/img/paralex/')
  		  },
  		  filename: function (req, file, cb) {
  		    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  		  }
  		}),
			upload = multer({ storage: storage })

// POST
	var addItem = function(req, res, next) {
    console.log(storage.filename)
    console.log('req.files: ' + req.files)
    var photos = []
		for(var i in req.files) {
		    photos.push(req.files[i].filename)
		}
    console.log('fotos: ' + photos)

    // res.send(newItem)
		res.render('private/dashboard')
	}

 // API ROUTES
  app.post('/paralex', upload.any(), addItem)

}