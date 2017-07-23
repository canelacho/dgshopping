var express = require('express'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		mongoose = require('mongoose'),
		morgan = require('morgan'),
		port = 3000,
		cookieSession = require('cookie-session'),
	  session_middleware = require("./middlewares/check_session");

mongoose.connect('mongodb://localhost/dgshopping2', function(err, res) {
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
app.use( morgan('dev') )
app.use(cookieSession({
	name: "session",
	keys: ["stars", "wars"]
}))

app.get('/', function(req, res) {
	res.render('index', { title: "D&G Shopping" })
})

app.get('/product_detail/:id', function(req, res) {
	res.render('product_detail', { title: "D&G Shopping - Producto" })
})

app.get('/search', function(req, res) {
	res.render('search')
})

app.get('/private-access', function(req, res) {
	res.render('login', { title: "Private Access - D&G Shopping" })
})

require('./routes/routes_products')(app)
require('./routes/routes_users')(app)
require('./routes/routes_groupSubgroup')(app)
require('./routes/routes_private')(app)
require('./routes/routes_carrousel')(app)
require('./routes/routes_paralex')(app)
require('./routes/routes_search_subgroup')(app)


// Every single page with path "app" have to be logged to show content
app.use('/app', session_middleware)

app.listen(port, function(){
	console.log('Server listening on port ' + port)
})
