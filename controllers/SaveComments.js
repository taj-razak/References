var postSchema = require('../model/PostSchema.js');


module.exports = function (req, res) {

    console.log(req.body.id)
    postSchema.findOne({
        userid: req.body.id
    }, function (err, data) {


        if (!err) {
            console.log(data)
            console.log(req.body.comment);

            data.comments.unshift({
                cmt: req.body.comment,
                user: req.session.sessionProfile_Name,
                user_id: req.session.session_userid
            });

            data.save(function (err, sdata) {
                    if (!err) {
                        console.log(sdata)
                        res.send(data)
                    } else {
                        console.log(err)
                    }
                })
                //console.log(data);
                //res.send(data);
        }
    })

}