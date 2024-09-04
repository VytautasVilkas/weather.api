
const axios = require('axios');
const getWeather = async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,  
        units: 'metric',  
      },
    });

    // Send back the weather data
    res.json(response.data);
  } catch (error) {
    // Handle errors from the API
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
  }
};

module.exports = { getWeather };