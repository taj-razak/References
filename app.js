var express = require('express'),
    ejs = require('ejs'),
    bodyparser = require('body-parser'),
    userSchema = require('./model/UserSchema.js'),
    postSchema = require('./model/PostSchema.js'),
    request = require('request'),
    dbConnection = require('./config/mongoconnect.js'),
    session = require('express-session'),
    fs = require('fs'),
    jsreport = require('jsreport'),






    userDataSave = require('./controllers/UserDataSaveCtrl.js'),
    loginUser = require('./controllers/LoginUserCtrl.js'),
    loginUserSessionCheckGetMethod = require('./controllers/LoginUserCtrl1.js'),
    getUserDetails = require('./controllers/GetUserDataCtrl.js'),
    savePost = require('./controllers/SavePostCtrl.js'),
    getPostsOfUsers = require('./controllers/GetPostsCtrl.js'),
    checkForSession = require('./controllers/SessionCheckCtrl.js'),
    saveComment = require('./controllers/SaveComments.js'),
    saveLike = require('./controllers/SaveLikeCtrl.js');


var privateKey = fs.readFileSync('./key.pem', 'utf8'),
    certificate = fs.readFileSync('./key-cert.pem', 'utf8'),
    credentials = {
        key: privateKey,
        cert: certificate
    };


var app = express(),

    https = require('https').createServer(credentials, app),
    io = require('socket.io')(https);




app.use(express.static(__dirname + '/config'))
app.use(express.static(__dirname + '/controllers'))
app.use(express.static(__dirname + '/helpers'))
app.use(express.static(__dirname + '/model'))
app.use(express.static(__dirname + '/public/css'))
app.use(express.static(__dirname + '/public/fonts'))
app.use(express.static(__dirname + '/public/img'))
app.use(express.static(__dirname + '/public/js'))
app.use(express.static(__dirname + '/public/js/controllers'))
app.use(express.static(__dirname + '/public/js/directives'))
app.use(express.static(__dirname + '/public/lib'))
app.use(express.static(__dirname + '/public/js/services'))
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/views/templates'))

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.use(session({
    secret: '$5%7&dgdf',
    resave: false,
    saveUninitialized: true

}))


//connect to the database....................
dbConnection.connect();


app.get('/', function (req, res) {


    console.log(process.env.NAME)
    res.render('index.ejs', {
        somePage: "LandingPage.html"
    });
    res.end()

})

//Saving the user data into the database (userDataSave is the callback function) ...............
app.post('/saveUserData', userDataSave)

//Check user is valid or not in database................................ 
app.post('/loginuser', loginUser);


app.get('/verify/:code',function(req,res){
console.log(req.params.code)

userSchema.update({VerifyCode:req.params.code},{Verified:true},function(err,data){
	if(!err)
	{
		res.redirect('/#/');	
	}


})


 
})



//it will be call when the user changes the url than it will be call and checks for session...........
app.get('/loginuser', loginUserSessionCheckGetMethod);

// gettting the details of the login user data.................
app.get('/getUserDetails', getUserDetails)

app.post('/textPosted', savePost)

app.get('/getPosts', getPostsOfUsers);


app.get('/sessionCheck', checkForSession);

app.post('/postcomment', saveComment);

app.post('/like', saveLike);


app.get('/logout', function (req, res) {
    req.session.destroy();

    res.redirect('/#/')
})


//ramesh testing code..................

app.post('/androidCall?', function (req, res) {

   console.log(req)
  
    userSchema.findOne({
        FirstName: "ramesh"
    }, function (err, data) {

        //console.log(typeof data)
console.log(req.query.call)        
res.send(true);

    })

});



https.listen(3000, function () {
    console.log("listening 3000")
});


io.on("connection", function (socket) {
    socket.on("clientPost", function (msg) {

        console.log("socket" + msg)

        socket.broadcast.emit("GettingPost", {
            post: msg
        });
    })

    socket.on("sendcomment", function (msg) {

        console.log("socket")
        console.log(msg)
        socket.broadcast.emit("GettingComment", msg);
    })


})
