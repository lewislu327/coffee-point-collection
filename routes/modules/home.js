const express = require('express')
const router = express.Router()
const Point = require('../../models/point')

router.get('/', async (req, res) => {
  try {
    const point = await Point.findOne({ userId: req.user._id }, 'Number').lean()
    if (point) {
      const number = point.Number
      return res.render('index', { number })
    }
    res.render('index')
  } catch (error) {
    console.err(error)
  }
})

router.post('/points', async (req, res) => {
  try {
    const point = await Point.findOne({ userId: req.user._id }, 'Number').lean()
    console.log(point)

    if (!point) {
      await Point.create({ Number: 1, userId: req.user._id })
      return res.redirect('/')
    }
    if (point.Number >= 1) {
      await Point.findOneAndUpdate({ userId: req.user._id }, { $inc: { Number: 1 } })
      return res.redirect('/')
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
