const bcrypt=require('bcrypt')
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

const hashPassword =async(password)=>{
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
userSchema.pre('save',async function(next){
    try{
        if(!this.isModified('Password')){
            return next();
        }
        this.Password=await hashPassword(this.Password);
        next();
    }
    catch(error){
        next(error);
    }
})

const User = mongoose.model('user', userSchema);
module.exports = {User,hashPassword};
