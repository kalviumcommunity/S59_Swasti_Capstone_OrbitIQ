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
    },
    Verify: {
        type: Boolean,
        default: false,
      },
      Otp: {
        type: String,
    }
});

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.generateOTP = function() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    this.Otp = otp.toString();
    return otp;
};

userSchema.methods.verifyOTP = function(otp) {
    return this.Otp === otp;
};

const User = mongoose.model('user', userSchema);
module.exports = { User, hashPassword };
