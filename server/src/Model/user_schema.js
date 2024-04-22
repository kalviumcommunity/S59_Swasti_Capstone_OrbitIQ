const mongoose =require('mongoose');
const { type } = require('os');

const userSchema =new mongoose.Schema({
    Username:{
        type:String,
    },
    Email:{
        type:String,
    },
    Password:{
        type:String,
    }
});

const User =mongoose.model('user',userSchema);
module.exports=User;