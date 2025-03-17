const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios')
const db = require('./dbconfig');

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

{/*Testing database connection*/}
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({success: true, time: result.rows[0]});
  }catch(error) {
    console.error('Database query error:', error);
    res.status(500).json({success: false,
      message: 'Failed to query the database'});
  }
})

{/*Storing rates*/}

app.post('/rates', async (req, res) => {
  const { base_currency, rates} = req.body;

  if(!base_currency || !rates) {
    return res.status(400).json({message: 'Invalid request body'});
  }

  const query = "INSERT INTO exchange_rates (base_currency, target_currency, exchange_rate, fetched_date) VALUES ($1, $2, $3, $4) ON CONFLICT (base_currency, target_currency, fetched_date) DO NOTHING"

  const today = new Date().toISOString().split('T')[0];

  try {
    const insertPromises = Object.entries(rates).map(async ([currency, rate]) => {
      await db.query(query, [base_currency, currency, rate, today]);
    });
    await Promise.all(insertPromises); //Waiting for all inserts to complete

    res.json({success: true, message: 'Rates stored successfully'});

  }catch(error){
    console.error('Database query error:', error);
    res.status(500).json({success: false,
      message: 'Failed to store the rates'});
  }

})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
