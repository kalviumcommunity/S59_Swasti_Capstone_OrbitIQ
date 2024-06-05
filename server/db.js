const mongoose = require('mongoose');
require('dotenv').config()

//retry functionality
const connectRetry=()=>{
  mongoose.connect(process.env.URI, {
  }).then(()=>{
    console.log('📦 connected to mongoDB');
  }).catch((err)=>{
    console.error('❌ error connecting to mongoDB:', err.message);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectRetry, 5000);
  })
}

//connecting server to MongoDB
const connectToDB = async () => {
  try {
    await connectRetry();
  } catch (err) {
    console.error('❌ initial connecting to mongoDB phase error:', err.message);
  }
};

const isConnected = () =>{
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectToDB,
  isConnected,
};
