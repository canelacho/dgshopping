var express = require('express'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		mongoose = require('mongoose'),
		port = 3000

mongoose.connect('mongodb://localhost/dgshopping', function(err, res) {
	if(err) console.log('ERROR: Connecting to DB / ' + err)
	else console.log('DB Connection, successfull')
})

var app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(express.static('controllers'))
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index', { title: "D&G Shopping" })
})

app.get('/product_detail/:id', function(req, res) {
	res.render('product_detail', { title: "D&G Shopping - Producto" })
})

app.get('/como_comprar', function(req, res) {
	res.render('como_comprar', { title: "D&G Shopping - Como comprar" })
})


require('./routes/routes_products')(app)
require('./routes/routes_users')(app)
require('./routes/routes_private')(app)
require('./routes/routes_groupSubgroup')(app)

app.listen(port, function(){
	console.log('Server listening on port ' + port)
})