require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { CLIENT_ORIGIN } = require('./config')
const usersRouter = require('./users/users-router')
const postsRouter = require('./posts/posts-router')
const imagesRouter = require('./images/images-router')
const reportsRouter = require('./reports/reports-router')
const authRouter = require('./auth/auth-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
/*
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
)
*/

app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)
app.use('/api/images', imagesRouter)
app.use('/api/reports', reportsRouter)
app.use('/api/auth', authRouter)


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
         response = { error: { message: 'server error' } }
  } else {
   console.error(error)
     response = { message: error.message, error }
  }
      res.status(500).json(response)
})
    

module.exports = app