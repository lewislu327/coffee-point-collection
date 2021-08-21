const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const moment = require('moment')

router.get('/', async (req, res) => {
  const users = await User.find({}).lean()
  users.forEach((user) => {
    user.createdAt = moment(user.createdAt).format('LLL')
  })
  return res.render('admin/members', { users })
})

router.post('/:id/addpoints', async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, { $inc: { points: 1 } }).lean()
  user.createdAt = moment(user.createdAt).format('LLL')
  req.flash('success_msg', '已成功新增點數')
  res.redirect('back')
})

router.delete('/:id/reducepoints', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }, 'points').lean()
    const points = user.points

    if (points > 0) {
      await User.findOneAndUpdate({ _id: req.params.id }, { $inc: { points: -1 } })
      req.flash('warning_msg', '已成功刪除點數')
      return res.redirect('back')
    }

    if (points === 0) {
      req.flash('warning_msg', '點數已為0點')
      return res.redirect('back')
    }
  } catch (error) {
    console.error(error)
  }
})

router.put('/:id/zeropoints', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean()
    console.log(user)
    if (user.points === 0) {
      req.flash('warning_msg', '點數已為0點')
      return res.redirect('back')
    }

    await User.findOneAndUpdate({ _id: req.params.id }, { points: 0 })
    req.flash('warning_msg', '已成功將點數歸零')
    return res.redirect('back')
  } catch (error) {
    console.error(error)
  }
})

router.get('/search', async (req, res) => {
  try {
    const id = req.query.keyword
    const user = await User.findOne({ id }).lean()
    user.createdAt = moment(user.createdAt).format('LLL')

    return res.render('admin/members', { user })
  } catch (error) {
    console.error(error)
  }
})
module.exports = router
