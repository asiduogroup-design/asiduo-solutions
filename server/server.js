const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.send('Server is running 🚀')
})

// Klarna session endpoint
app.post('/api/klarna/session', async (req, res) => {
  try {
    // Example order data (customize as needed)
    const orderData = {
      purchase_country: 'IT',
      purchase_currency: 'EUR',
      locale: 'it-IT',
      order_amount: 10000, // in cents (e.g., 100.00 EUR)
      order_tax_amount: 2000,
      order_lines: [
        {
          type: 'physical',
          reference: '123456789',
          name: 'Servizio Software',
          quantity: 1,
          unit_price: 10000,
          tax_rate: 2000,
          total_amount: 10000,
          total_tax_amount: 2000,
        },
      ],
      merchant_urls: {
        terms: 'https://yourdomain.com/terms',
        checkout: 'https://yourdomain.com/checkout',
        confirmation: 'https://yourdomain.com/confirmation',
        push: 'https://yourdomain.com/api/klarna/push',
      },
    };

    const response = await axios.post(
      `${KLARNA_API_URL}/checkout/v3/orders`,
      orderData,
      {
        auth: {
          username: KLARNA_USERNAME,
          password: KLARNA_PASSWORD,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Klarna session error:', error.response?.data || error.message)
    res.status(500).json({ error: 'Failed to create Klarna session' })
  }
})

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch(err => console.log(err))

app.listen(5000, () => {
  console.log('Server running on port 5000 🚀')
})