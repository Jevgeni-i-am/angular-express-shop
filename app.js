const express = require('express')
const authRoutes = require('./routes/auth')
const app = express()

app.use('/api/auth', authRoutes) //localhost:5000/api/auth/login


module.exports = app

