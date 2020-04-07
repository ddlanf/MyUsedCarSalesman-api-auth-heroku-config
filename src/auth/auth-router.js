const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { user_name, password } = req.body
    const loginUser = { user_name, password }

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key.replace('_', ' ')}' in request body`
        })

    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.user_name
    )
      .then(dbUser => {
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect user name or password',
          })
       else if(dbUser.user_status === 'Blocked'){
              return res.status(400).json({
                error: 'This user is blocked',
              })
       }
         
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect user name or password',
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
              error: 'Incorrect admin name or password',
            })

          return AuthService.comparePasswords(loginAdmin.password, dbAdmin.password)
            .then(compareMatch => {
              if (!compareMatch)
                return res.status(400).json({
                  error: 'Incorrect admin name or password',
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

authRouter
  .get('/check-jwt', (req, res, next) =>{
        
      const authToken = req.get('Authorization') || ''

      let bearerToken
      if (!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'Missing bearer token' })
      } else {
        bearerToken = authToken.slice(7, authToken.length)
      }
     
      try {
        const payload = AuthService.verifyJwt(bearerToken)
    
        AuthService.getUserWithUserName(
          req.app.get('db'),
          payload.sub,
        )
          .then(user => {
            if (!user)
              {return res.status(401).json({ error: 'user not found' })}
            
              return res.json('valid')
          })
          .catch(err => {
            console.error(err)
          })
      } catch(error) {
           res.json({ status : 'expired' })
      }
    
  })

module.exports = authRouter