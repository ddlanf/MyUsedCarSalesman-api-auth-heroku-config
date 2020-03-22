const express = require('express')
const AuthService = require('./auth-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { requireAuthAdmin } = require('../middleware/jwt-auth-admin')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { user_name, password } = req.body
    const loginUser = { user_name, password }

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.user_name
    )
      .then(dbUser => {
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect user_name or password',
          })

        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect user_name or password',
              })

            const sub = dbUser.user_name
            const payload = { user_id: dbUser.id }
            res.send({
              authToken: AuthService.createJwt(sub, payload),
            })
          })
      })
      .catch(next)
  })

authRouter
  .post('/admin-login', jsonBodyParser, (req, res, next) => {
      const { admin_name, password } = req.body
      const loginAdmin = { admin_name, password }

      for (const [key, value] of Object.entries(loginAdmin))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          })

      AuthService.getAdminWithAdminName(
        req.app.get('db'),
        loginAdmin.admin_name
      )
        .then(dbAdmin => {
          if (!dbAdmin)
            return res.status(400).json({
              error: 'Incorrect admin_name or password',
            })

          return AuthService.comparePasswords(loginAdmin.password, dbAdmin.password)
            .then(compareMatch => {
              if (!compareMatch)
                return res.status(400).json({
                  error: 'Incorrect admin_name or password',
                })

              const sub = dbAdmin.admin_name
              const payload = { admin_id: dbAdmin.id }
              res.send({
                authToken: AuthService.createJwt(sub, payload),
              })
            })
        })
        .catch(next)
  })

  authRouter.post('/refresh', requireAuth, (req, res) => {
    const sub = req.user.user_name
    const payload = { user_id: req.user.id }
    res.send({
      authToken: AuthService.createJwt(sub, payload),
    })
  })

  authRouter.post('/admin-refresh', requireAuthAdmin, (req, res) => {
    const sub = req.user.admin_name
    const payload = { admin_id: req.admin.id }
    res.send({
      authToken: AuthService.createJwt(sub, payload),
    })
  })

module.exports = authRouter