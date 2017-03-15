var User = require('../models/users');

module.exports = function(req, res, next){

	// console.log(req.session)

	if(req.session.user_id){
		User.findById(req.session.user_id, function(err, doc){
			if(err){
				console.log('Sessison Created error: ' + err);
				res.redirect("/")
			}else{
				console.log('Continue Sessison or Created... ok ')
				// console.log(req.session)
				res.locals = { user: doc };
				console.log('Res. Locals ----------')
				console.log(res.locals)
				next();
			}
		});
	}	else {
		console.log("there is NO session");
		res.redirect("/private-access");
		
	}
}
