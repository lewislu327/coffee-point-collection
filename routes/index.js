const express = require('express')
const router = express.Router()
const homeRoute = require('./modules/home')
const userRoute = require('./modules/user')
const adminRoute = require('./modules/admin')

const { authenticator } = require('../middlewares/auth')

router.use('/admin', adminRoute)
router.use('/users', userRoute)
router.use('/', authenticator, homeRoute)

module.exports = router
