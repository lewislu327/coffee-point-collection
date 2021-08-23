const express = require('express')
const router = express.Router()
const authRoute = require('./modules/auth')
const homeRoute = require('./modules/home')
const userRoute = require('./modules/user')
const adminRoute = require('./modules/admin')

const { authenticator, authenticatedAdmin } = require('../middlewares/auth')

router.use('/admin', authenticatedAdmin, adminRoute)
router.use('/users', userRoute)
router.use('/auth', authRoute)
router.use('/', authenticator, homeRoute)

module.exports = router
