const passport = require('passport');
const express = require("express");
const router = express.Router();
const User = require("../Model/user_schema");
const { ValidateUserSchema } = require("../Model/joi_schema");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const GoogleUser = require("../Model/google_user");
const jwt=require('jsonwebtoken');


const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const URL = process.env.URL;
const CLIENT_URL=process.env.CLIENT_URL;
const JWT_SECRET=process.env.JWT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${URL}/user/google/callback`,
  scope: ['profile', 'email']
},
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const userData = profile._json;
      const email = userData.email;
      const username = userData.name;
      const picture = userData.picture;
      console.log("Google authentication user data:", userData);
      let user = await User.findOne({ Email: email });

      if (!user) {
        user = new User({ Username: username, Email: email, Image: picture });
        await user.save();
      }
      const { _id, Username, Image, Email } = user;
      await GoogleUser.deleteMany({});
      const ship = new GoogleUser({ UserId: user._id, Username, Image, Email })
      const resp = await ship.save()
      console.log(resp);
      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  }
));

passport.serializeUser(function (User, cb) {
  cb(null, User.id);
})

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err, null);
  }
});

router.get('/google', passport.authenticate("google", { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate("google", { failureRedirect: `${CLIENT_URL}/login`, successRedirect: `${CLIENT_URL}/google/success` }));

router.get('/google/login/success', async (req, res) => {
  try {
    const users = await GoogleUser.find();
    if (users.length === 0) {
      res.status(404).json({ message: 'No users found' });
      return;
    }
    const user = users[0];
    res.json({ Username: user.Username, Image: user.Image, Email: user.Email, UserId: user.UserId });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user data: " + error });
  }
});

router.post("/checkpassword/:id", async (req, res) => {
  const { OldPass } = req.body;
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const isPasswordMatch = OldPass === user.Password;
    return res.status(200).json({ isPasswordMatch });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch("/changeUserData/:id", async (req, res) => {
  try {
    const changedUserData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!changedUserData) {
      return res.status(404).send("User not found");
    }
    res.json(changedUserData);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
})

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  }
  catch (error) {
    res.status(400).json({ error: "Cannot get the User data" + error })
  }
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email: Email, Password: Password });
    if (user) {
      const { Username, Image, Email ,_id} = user;
      const token=jwt.sign({Username,Image,Email,UserId:_id},JWT_SECRET,{expiresIn:'12h'})
      res.cookie('token',token,{httpOnly:true});
      res.status(200).json({ message: "Login successful", Username: Username, Image: Image, Email: Email, UserId: user._id });
    }
    else {
      res.status(401).json({ message: "Check your Email and Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error:Login failed" });
  }
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

router.post("/signup", async (req, res) => {
  const { Username, Email, Password } = req.body;
  try {
    const { error } = ValidateUserSchema(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const exist = await User.findOne({ Email });
    if (exist) {
      res.status(400).json({ message: "User already registered" });
    } else {
      const User_Added = new User({
        Username,
        Email,
        Password
      });
      const savedUser = await User_Added.save();
      res.status(201).json({ data: savedUser, message: "User added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;