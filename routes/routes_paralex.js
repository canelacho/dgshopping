module.exports = function(app) {
	var fs = require('fs'),
			multer = require('multer'),
			storage = multer.diskStorage({
  		  destination: function (req, file, cb) {
  		    cb(null, './public/img/paralex/')
  		  },
  		  filename: function (req, file, cb) {
  		    // cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  		    cb(null, 'paralex.jpg')
  		  }
  		}),
			upload = multer({ storage: storage })

// POST
	var addItem = function(req, res, next) {
		
		console.log('aqui va el viejo')
    console.log(storage.filename)
    console.log('req.files: ' + req.files)
    var photos = []
		for(var i in req.files) {
		    photos.push(req.files[i].filename)
		}
    console.log('fotos: ' + photos)


		console.log('=============================')
		fs.readdir('./public/img/paralex/', function(err, files){
			if (err) {
		    return console.error(err);
		  }
		  files.forEach( function (file){
		  	console.log('=============================')
		  	console.log( file );
		  	console.log('=============================')
		  	console.log(photos[0])

		  		if(file !== photos){
		  	
			  	// 	fs.unlink('./public/img/paralex/'+file, function(err){
						// if (err) {
				  //   	return console.error(err);
				  //  	}
				  //  	console.log("File deleted successfully!");
					//})
		  	}
		  });
		})

    // res.send(newItem)
		res.render('private/dashboard')
	}



 // API ROUTES
  app.post('/paralex', upload.any(), addItem)

}