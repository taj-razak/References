var mongoose = require('mongoose'),
userSchema = require('../model/UserSchema.js'),
nodemailer=require('nodemailer');


var transporter = nodemailer.createTransport("SMTP",{
    service: 'Gmail',
    auth: {
        user: 'testmailer1133@gmail.com',
        pass: 'testmailer'
    }
});







module.exports = function(req, res) {

    //console.log(req.body.userData.password)
    
        var verifycode=getVerifyPasscode();

    var userDetails = new userSchema({
    	FirstName: req.body.userData.firstname,
    	LastName: req.body.userData.lastname,
    	Email: req.body.userData.email,
    	Password: req.body.userData.password,
    	DateOfBirth: req.body.userData.dateofbirth,
        VerifyCode:verifycode,
       Verified:false
    });

    userDetails.save(function(err, data) {

    	if (!err) {
    		console.log("saved")
    		res.send(true)
       var mailOptions = {
	    from: 'Demo App', // sender address 
	    to:req.body.userData.email, // list of receivers 
	    subject: 'Please Verify Email', // Subject line 
	    text: 'Verify your email via this link otherwise you will not able to login.', // plaintext body 
	    html: '<a href="https://192.168.199.107:3000/verify/'+verifycode+'">Verify Your Email</a>' // html body 
	};


        transporter.sendMail(mailOptions, function(error, info){
                  if(error){
			    return console.log(error);
	             }
                 console.log('Message sent');
         });			
    	}
    })



};

function getVerifyPasscode(){
  var length = 8,
        charset = "abcdefghijknopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    retVal += Math.floor(Math.random() * 10)
    return retVal;

}
