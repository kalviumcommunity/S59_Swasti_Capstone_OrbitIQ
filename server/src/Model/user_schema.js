const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;
