const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const moment = require('moment')

router.get('/', async (req, res) => {
  const users = await User.find({}).lean()
  users.forEach((user) => {
    user.createdAt = moment(user.createdAt).format('LLL')
  })

  console.log(users)
  return res.render('admin/users', { users })
})
module.exports = router
