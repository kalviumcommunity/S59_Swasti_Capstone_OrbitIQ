const app = require('./app');
const { connectToDB } = require('./db');

const port = process.env.PORT || 3000;
connectToDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
