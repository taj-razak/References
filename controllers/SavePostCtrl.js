var postSchema = require('../model/PostSchema.js');


module.exports = function (req, res) {

    console.log(req.session.session_userid)
    console.log(req.body.content)

    var saveData = new postSchema({
        userid: req.session.session_userid,
        userProfileName: req.session.sessionProfile_Name,
        post_time: new Date(),
        post_content: req.body.content
    });

    saveData.save(function (err, data) {
        if (!err) {
            console.log(data)
            res.send(data)
        } else {
            res.send(false);
        }
    })

}