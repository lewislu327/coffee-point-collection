module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        return res.redirect('/admin')
      }
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')
    res.redirect('/users/login')
  },
  authenticatedAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        return next()
      }
      return res.redirect('/')
    }
    res.redirect('/')
  }
}
