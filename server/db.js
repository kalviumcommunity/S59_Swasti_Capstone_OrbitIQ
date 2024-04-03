const mongoose = require('mongoose');
require('dotenv').config()

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.URI, {
    });
    console.log('📦 connected to mongoDB');
  } catch (err) {
    console.error('❌ error connecting to mongoDB:', err.message);
  }
};

const isConnected = () =>{
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectToDB,
  isConnected,
};
