const axios = require('axios');
const cors = require('cors');

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',  // Local development
  'https://vytautasvilkas.vercel.app',  // Deployed frontend
];

// Create a CORS middleware
const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  // Allow the request if the origin is in the allowed list
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow credentials (e.g., cookies)
});

module.exports = async (req, res) => {
  // Apply CORS middleware to the request
  corsMiddleware(req, res, async () => {
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

      res.status(200).json(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        res.status(404).json({ error: 'City not found' });
      } else {
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
      }
    }
  });
};

