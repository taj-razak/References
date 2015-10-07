var mongoose = require('mongoose'),
userSchema = require('../model/UserSchema.js');


module.exports = function(req, res) {

    //console.log(req.body.userData.password)

    var userDetails = new userSchema({
    	FirstName: req.body.userData.firstname,
    	LastName: req.body.userData.lastname,
    	Email: req.body.userData.email,
    	Password: req.body.userData.password,
    	DateOfBirth: req.body.userData.dateofbirth
    });

    userDetails.save(function(err, data) {

    	if (!err) {
    		console.log("saved")
    		res.send(true)
    	}
    })



};
