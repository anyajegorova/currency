const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API = process.env.API_KEY;

app.get('/', async (req, res) => {
   try{
    const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${API}`);
    res.json(response.data);
   }catch(err){ 
    res.status(500).json({ message: 'Failed to fetch the rates' });
   }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});