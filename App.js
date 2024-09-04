const express = require('express');
const cors = require('cors');
const { getWeather } = require('./controllers/weatherController'); 
const app = express();
const port = process.env.PORT || 8080;
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true,  
}));
app.use(express.json());
app.get('/api/weather', getWeather);  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


