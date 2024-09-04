const cors = require('cors');
const allowedOrigins = [
  'http://localhost:3000',  
  'https://vytautasvilkas.vercel.app',  
];
const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
});
module.exports = (req, res) => {
  corsMiddleware(req, res, () => {
    res.status(200).send('Hello');
  });
};
