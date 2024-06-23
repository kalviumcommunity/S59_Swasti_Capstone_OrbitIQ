const axios = require('axios');

const fetchAPOD = async () => {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: process.env.NASA_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching APOD:', error.message);
    throw error;
  }
};

module.exports = fetchAPOD;
