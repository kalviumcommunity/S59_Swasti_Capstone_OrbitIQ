const express = require('express');

const app = express();
const routes = require('./src/Routes/main.routes');

app.use(express.json())
app.use('/data',routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
