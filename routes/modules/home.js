const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }, 'points').lean()
    const points = user.points
    return res.render('index', { points })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
