require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const app = express()

const PORT = Number(process.env.PORT) || 5000
const JWT_SECRET = process.env.JWT_SECRET
const MONGO_URL = process.env.MONGO_URL
const CORS_ORIGINS = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

if (!JWT_SECRET || !MONGO_URL) {
  console.error('Missing required environment variables: JWT_SECRET and/or MONGO_URL')
  process.exit(1)
}

const defaultAllowedOrigins = ['https://asiduo.com', 'https://www.asiduo.com']
const allowedOrigins = CORS_ORIGINS.length > 0 ? CORS_ORIGINS : defaultAllowedOrigins

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const normalizeEmail = (value) => String(value || '').trim().toLowerCase()
const normalizePassword = (value) => String(value || '').trim()

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true)
      return
    }

    const isAllowedOrigin = allowedOrigins.includes(origin)
    const isVercelPreview = /^https:\/\/.+\.vercel\.app$/.test(origin)

    if (isAllowedOrigin || isVercelPreview) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}

app.set('trust proxy', 1)
app.use(helmet())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
)
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running')
})

/* ================= REGISTER ================= */

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body

  try {
    const normalizedEmail = normalizeEmail(email)
    const normalizedPassword = normalizePassword(password)

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const existingUser = await User.findOne({
      email: { $regex: `^${escapeRegex(normalizedEmail)}$`, $options: 'i' },
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(normalizedPassword, 10)

    const user = new User({
      email: normalizedEmail,
      password: hashedPassword,
    })

    await user.save()

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'User registered',
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

/* ================= LOGIN ================= */

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const normalizedEmail = normalizeEmail(email)
    const normalizedPassword = normalizePassword(password)

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({
      email: { $regex: `^${escapeRegex(normalizedEmail)}$`, $options: 'i' },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const match = await bcrypt.compare(normalizedPassword, user.password)

    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

/* ================= MONGODB ================= */

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
