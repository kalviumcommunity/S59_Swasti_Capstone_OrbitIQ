const redis = require('redis');
require("dotenv").config();

const redisClient = redis.createClient({
    password: process.env.REDIS_PASS,
    url: process.env.REDIS_URL
});

redisClient.connect()
.then(() => {
  console.log('Connected to Redis')
})
.catch((error) => {
  console.log('Error connecting to Redis', error)
})

module.exports = redisClient;
