var postSchema = require('../model/PostSchema.js');

module.exports = function (req, res) {

    postSchema.find({}, function (err, data) {

        res.send(data);

    }).sort({
        $natural: -1
    })

}