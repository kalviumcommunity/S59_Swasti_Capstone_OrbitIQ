const express = require('express');
const cors = require("cors");
const passport = require("passport");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const app = express();
require('dotenv').config();


const routes = require('./src/Routes/main.routes');
const lu_routes = require('./src/Routes/learningUnits.routes')
const user_routes = require('./src/Routes/authentification.routes');
const fileUploaded = require('./src/Routes/fileUpload')
const { connectToDB } = require("./db");
connectToDB();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = process.env.CORS_ORIGIN_PROD ;
app.use(cors({
  credentials: true,
  origin: allowedOrigins
}));

app.use(cookieparser());
app.use(express.json());
app.use('/data', routes);
app.use('/user', user_routes);
app.use('/upload', fileUploaded);
app.use('/learning', lu_routes);


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
