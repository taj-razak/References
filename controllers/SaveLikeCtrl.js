var postSchema = require('../model/PostSchema.js');

module.exports = function (req, res) {

    console.log(req.body.likeStatus)
    console.log(req.body.postid)
    postSchema.findOne({
        userid: req.body.postid
    }, function (err, data) {
        if (!err) {
            console.log(req.body.likeStatus);


            if (req.body.likeStatus == true) {

                console.log(req.body.likeStatus)


                data.likes.unshift({
                    likerid: req.session.session_userid,
                    likername: req.session.sessionProfile_Name,

                });
                data.save(function (err, data) {
                    if (!err) {
                        console.log("like saved")
                        res.send("like saved");
                    } else {
                        res.send("like not saved");
                    }
                })
            } else {
                console.log(req.body.likeStatus)

                var index = data.likes.indexOf(data.likes.filter(function (e) {
                    e.likerid == req.body.postid
                })[0]);

                data.likes.splice(index, 1);
                data.save(function (err, data) {
                    if (!err) {
                        console.log("like removed")

                        res.send(true)
                    } else {
                        console.log(e.message)
                        res.send(false)
                    }

                })
            }
            //res.send(true)
        }

    })



}