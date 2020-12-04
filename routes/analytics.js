const express = require('express')
const passport = require('passport')
const controller = require('../controllers/analytics')
const router = express.Router()


//localhost:5000/api/auth/login
router.get('/overview', controller.overview)
//localhost:5000/api/auth/register
router.get('/analytics', controller.analytics)

module.exports = router