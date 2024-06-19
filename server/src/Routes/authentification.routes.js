const passport = require('passport');
const bcrypt = require('bcrypt');
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { User, hashPassword } = require("../Model/user_schema");
const { ValidateUserSchema } = require("../Model/joi_schema");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const GoogleUser = require("../Model/google_user");
const jwt = require('jsonwebtoken');


const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const URL = process.env.URL;
const CLIENT_URL = process.env.CLIENT_URL;
const JWT_SECRET = process.env.JWT_SECRET;

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
    const { UserId, Username, Image, Email } = user;
    let token;
    try {
      token = jwt.sign({ Username, Image, Email, UserId }, JWT_SECRET, { expiresIn: '12h' })
      res.cookie('token', token, { httpOnly: false, secure: true, sameSite: 'Lax', maxAge: 12 * 60 * 60 * 1000 });
    } catch (err) {
      return res.status(500).json({ message: "Token generation failed", error: err.message });
    }
    res.status(200).json({ message: "Login successful", Username: Username, Image: Image, Email: Email, UserId: UserId, token: token });
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
    const isPasswordMatch = await bcrypt.compare(OldPass, user.Password)
    return res.status(200).json({ isPasswordMatch });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch("/changeUserData/:id", async (req, res) => {
  const { Password } = req.body;
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const temp = user.Password;
    const hashedPass = await hashPassword(Password);
    user.Password = hashedPass;
    await user.save();
    console.log(temp, "-->", Password, "which is", user.Password);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
})
router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: 'Invalid user ID' });
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});


router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  }
  catch (error) {
    res.status(400).json({ error: "Cannot get the User data" + error })
  }
});


router.post("/signup", async (req, res) => {
  const { Username, Email, Password } = req.body;
  console.log("user entered/signup", Password);
  try {
    const { error } = ValidateUserSchema(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const exist = await User.findOne({ Email: Email });
    if (exist) {
      res.status(400).json({ message: "User already registered" });
    } else {
      const hashedPass = await hashPassword(Password)
      console.log("userhassed /signup", hashedPass);
      const User_Added = new User({
        Username,
        Email,
        Password: hashedPass
      });
      const savedUser = await User_Added.save();
      res.status(201).json({ data: savedUser, message: "User added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email: Email });
    if (!user) {
      console.log("User not found")
      return res.status(404).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(Password, user.Password)
    if (!isMatch) {
      console.log("Wrong credentials.")
      return res.status(401).json({ message: "The credentials you added were wrong." })
    }
    const { Username, Image } = user;
    const token = jwt.sign({ Username, Image, Email, UserId: user._id }, JWT_SECRET, { expiresIn: '12h' })
    res.cookie('token', token, { httpOnly: false, secure: true, sameSite: 'Lax', maxAge: 12 * 60 * 60 * 1000 });
    res.status(200).json({ message: "Login successful", Username: Username, Image: Image, Email: Email, UserId: user._id, token: token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie('token', { httpOnly: false, secure: true, sameSite: 'Lax' });
  res.status(200).json({ message: "Logout successful" });
});



module.exports = router;