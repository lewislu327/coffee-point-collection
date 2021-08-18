const express = require('express')
const router = express.Router()
const homeRoute = require('./modules/home')
const userRoute = require('./modules/user')

const { authenticator } = require('../middlewares/auth')

router.use('/users', userRoute)
router.use('/', authenticator, homeRoute)

module.exports = router
