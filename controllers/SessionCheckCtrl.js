module.exports = function (req, res) {

    if (req.session.session_userid) {
        // console.log("session checked")
        //res.redirect('/loginuser')
        res.send(true)
    } else {
        res.send(false)
    }

}