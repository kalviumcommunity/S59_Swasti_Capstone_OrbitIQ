const bcrypt = require('bcrypt')
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

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const User = mongoose.model('user', userSchema);
module.exports = { User, hashPassword };
