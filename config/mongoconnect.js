 var mongoose = require('mongoose');
     module.exports = {
         connect: function () {
    mongoose.connect('mongodb://127.0.0.1/Assignment')
    mongoose.connection.once('open', function (callback) {
        console.log("Connection Established Successfully")
    });
}

     }
