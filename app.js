if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
require('./config/mongoose')
const usePassport = require('./config/passport')
const routes = require('./routes')
const session = require('express-session')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const flash = require('connect-flash')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  })
)
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.errors = req.flash('errors')
  next()
})
app.use(routes)
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
