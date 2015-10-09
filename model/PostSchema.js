var mongoose = require('mongoose');

module.exports = mongoose.model('posts', {

    userid: {
        type: String,
        required: true

    },
    userProfileName: {
        type: String,
        required: true
    },
    post_content: {
        type: String
    },
    post_time: {
        type: Date
    },
    likes: [],

    comments: []


})