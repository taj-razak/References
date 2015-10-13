var postSchema = require('../model/PostSchema.js');

module.exports = function (req, res) {

    console.log(req.body.likeStatus)
    console.log(req.body.postid)


    /*used $push and $pull for adding new data and removing the existing data.......................*/

    if (req.body.likeStatus) {

        postSchema.update({
            userid: req.body.postid
        }, {
            $push: {
                likes: {
                    likerid: req.session.session_userid,
                    likername: req.session.sessionProfile_Name

                }
            }
        }, function (err, data) {
            if (!err) {
                console.log("saved");
                res.send(true);
            }
        })

    } else {



        postSchema.update({
            userid: req.body.postid
        }, {
            $pull: {
                likes: {
                    likerid: req.session.session_userid,
                    likername: req.session.sessionProfile_Name
                }
            }
        }, function (err, data) {

            if (!err) {
                console.log(data)
                console.log("removed like")
                res.send(true)
            }
        })


    }




}