var mongoose = require('mongoose'),
    userSchema = require('../model/UserSchema.js');

module.exports = function (req, res) {

    //console.log(req.body);


    userSchema.findOne({
        _id: req.session.session_userid
    }, function (err, data) {

        if (data) {

            res.render('index.ejs', {
                somePage: "UserDashBoard.html"
            })

        } else {
            res.redirect('/#/');
        }

    })

}