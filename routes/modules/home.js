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

router.post('/addpoints', async (req, res) => {
  try {
    const point = await Point.findOne({ userId: req.user._id }, 'Number').lean()
    console.log(point)

    if (!point) {
      await Point.create({ Number: 1, userId: req.user._id })
      req.flash('success_msg', '已成功新增點數')
      return res.redirect('/')
    }
    if (point.Number >= 0) {
      await Point.findOneAndUpdate({ userId: req.user._id }, { $inc: { Number: 1 } })
      req.flash('success_msg', '已成功新增點數')
      return res.redirect('/')
    }
  } catch (error) {
    console.error(error)
  }
})

router.delete('/reducepoints', async (req, res) => {
  try {
    const point = await Point.findOne({ userId: req.user._id }, 'Number').lean()
    console.log(point)

    if (point.Number > 0) {
      await Point.findOneAndUpdate({ userId: req.user._id }, { $inc: { Number: -1 } })
      req.flash('warning_msg', '已成功刪除點數')
      return res.redirect('/')
    }

    if (point.Number === 0) {
      req.flash('warning_msg', '點數已為0點')
      return res.redirect('/')
    }
  } catch (error) {
    console.error(error)
  }
})

router.put('/zeropoints', async (req, res) => {
  try {
    const point = await Point.findOne({ userId: req.user._id }, 'Number').lean()
    console.log(point)

    if (point.Number > 0) {
      await Point.findOneAndUpdate({ userId: req.user._id }, { Number: 0 })
      req.flash('warning_msg', '已成功將點數歸零')
      return res.redirect('/')
    }

    if (point.Number === 0) {
      req.flash('warning_msg', '點數已為0點')
      return res.redirect('/')
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
