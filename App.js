const express = require('express');
const cors = require('cors');
const { getWeather } = require('./controllers/weatherController'); 
const app = express();

app.use(cors({
  origin: 'https://vytautasvilkas.vercel.app',  
  credentials: true,  
}));
app.use(express.json());
app.get('/api/weather', getWeather);  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


