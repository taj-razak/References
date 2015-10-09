var userSchema = require('../model/UserSchema.js');

module.exports = function (req, res) {

    //console.log(req.body);

    userSchema.findOne({
        Email: req.body.useremail,
        Password: req.body.userpassword
    }, function (err, data) {

        if (data) {
            req.session.session_userid = data._id;
            req.session.sessionProfile_Name = data.FirstName + " " + data.LastName;
            res.render('index.ejs', {
                somePage: "UserDashBoard.html"
            })

        } else {
            res.redirect('/#/');
        }

    })

}