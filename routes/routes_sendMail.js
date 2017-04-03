
var mailer = require("nodemailer");

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
		service: "Gmail",
		auth: {
				user: "hdpldaniel@gmail.com",
				pass: "13990884hdpl"
		}
});

var mail = {
		from: "Contacto DG Shopping <contacto@dgshopping.com>",
		to: "hdpl@binarysolutions.com.ve",
		subject: "Send Email Using Node.js",
		text: "Node.js New world for me",
		html: "<b>Node.js New world for me</b>"
}


smtpTransport.sendMail(mail, function(error, response){
		if(error){
				console.log(error);
		}else{
				console.log("Message sent: " + response.message);
		}

		smtpTransport.close();
});
