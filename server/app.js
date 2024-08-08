const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const routes = require('./src/Routes/main.routes');
const lu_routes = require('./src/Routes/learningUnits.routes');
const user_routes = require('./src/Routes/authentification.routes');
const fileUploaded = require('./src/Routes/fileUpload');
const Langchain = require('./src/Routes/Langchain.routes');
const ChatCompletion = require('./src/Routes/chatCompletion.routes');
const PaymentRoutes = require("./src/Routes/payement.routes");
const scheduleAPODEmails = require('./src/utils/scheduleCronjob');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
const allowedOrigins = [
    'http://localhost:5173',
    'https://orbitiq.netlify.app'
];

app.use(
  cors({
    credentials: true,
    origin: "https://orbitiq.netlify.app",
  })
);
app.use(cookieparser());

app.use('/data', routes);
app.use('/user', user_routes);
app.use('/upload', fileUploaded);
app.use('/learning', lu_routes);
app.use('/genai', Langchain);
app.use('/chat-autocomplete', ChatCompletion);
app.use('/payment', PaymentRoutes);

scheduleAPODEmails();

module.exports = app;
