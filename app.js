const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')// PASSPORT JS - набор стратегий регистрации и т.д.
const bodyParser = require('body-parser') //Парсирование объектов .body
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log('MongoDB connected'))
	.catch(error => console.log(error))

app.use(passport.initialize())
require('./middlewear/passport')(passport)


// Логирование запросов с помощю  MORGAN
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//обработка CORS запросов с других серверов
app.use(require('cors')())


app.use('/api/auth', authRoutes) //localhost:5000/api/auth/login
app.use('/api/analytics', analyticsRoutes) //localhost:5000/api/auth/analytics
app.use('/api/category', categoryRoutes) //localhost:5000/api/auth/category
app.use('/api/order', orderRoutes) //localhost:5000/api/auth/order
app.use('/api/position', positionRoutes) //localhost:5000/api/auth/position


module.exports = app

