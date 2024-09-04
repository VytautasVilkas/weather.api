const express = require('express');
const cors = require('cors');
const { getWeather } = require('./controllers/weatherController'); 
const app = express();

app.use(cors({
  origin: 'https://wb-cyr1bmo9a-vytautasvilkas-projects.vercel.app/',  
  credentials: true,  
}));
app.use(express.json());
app.get('/api/weather', getWeather);  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


