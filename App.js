const express = require('express');
const cors = require('cors');
const { getWeather } = require('./controllers/weatherController'); 
const app = express();

// List of allowed origins (local and deployed frontend)
const allowedOrigins = [
  'http://localhost:3000',  // For local development
  'https://vytautasvilkas.vercel.app',  // Deployed frontend
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);   (e.g., Postman)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  
}));
app.use(express.json());
app.get('/api/weather', getWeather);  
const port = process.env.PORT || 8080;  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});