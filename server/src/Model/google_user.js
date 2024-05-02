const mongoose = require('mongoose');

const userGoogleSchema = new mongoose.Schema({
    UserId:{
        type: String,
    },
    Username: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String,
    },
    Image: {
        type: String,
        default: './public/profile-default.png'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5
    }
});

const GoogleUser = mongoose.model('GoogleUser', userGoogleSchema);
module.exports = GoogleUser;
