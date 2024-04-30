const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../Model/user_schema");
require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const URL = process.env.URL;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${URL}/google/callback`,
    scope: ['email', 'profile'] 
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const email = profile.emails[0].value;
      const username=profile.displayName;
      let user = await User.findOne({ Email: email });

      if (!user) {
        user = new User({ Username:username,Email: email });
        await user.save();
      }

      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  }
));

passport.serializeUser(function(User,cb){
    cb(null,User.id);
})

passport.deserializeUser(function(id,cb){
    User.findById(id,function(err,User){
        cb(err,User);
    })
})
