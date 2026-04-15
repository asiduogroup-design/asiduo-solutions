require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const app = express()

app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET
app.get('/', (req, res) => {
  res.send('Server is running 🚀')
})

/* ================= REGISTER ================= */

app.post('/api/register', async (req, res) => {

  const { email, password } = req.body

  try {

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hashedPassword
    })

    await user.save()

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "User registered",
      token
    })

  } catch (err) {

    console.error(err)
    res.status(500).json({ error: "Server error" })

  }

})

/* ================= LOGIN ================= */

app.post('/api/login', async (req, res) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Login successful",
      token
    })

  } catch (err) {

    console.error(err)
    res.status(500).json({ error: "Server error" })

  }

})

/* ================= MONGODB ================= */

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err))

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀")
})