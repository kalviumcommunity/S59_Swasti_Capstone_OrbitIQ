const express = require('express');
const cors=require("cors");

const app = express();

app.use(cors());
const routes = require('./src/Routes/main.routes');
const user_routes=require('./src/Routes/authentification.routes');
const { connectToDB } = require("./db");
connectToDB();

app.use(express.json());
app.use('/data',routes);
app.use('/user',user_routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
