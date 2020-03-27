const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const { requireAuthAdmin } = require('../middleware/jwt-auth-admin') 
const { requireAuth } = require('../middleware/jwt-auth') 
const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .route('/')
   .get(requireAuthAdmin, (req, res, next) => {
      UsersService.getAllUsers(req.app.get('db'))
        .then(users =>{
            res.json(users)
        })
    })
   .post(jsonBodyParser, (req, res, next) => {
    const { user_name, password, first_name, last_name, email } = req.body

    const newUser = { user_name, password, first_name, last_name, email }

    for(let [key, value] of Object.entries(newUser)){
        if(value == null){
            return res.status(400).json({
                error: `Missing '${key}' in request body`
            })
        }
    }

    if(!newUser.email.includes('@') || !newUser.email.slice(newUser.email.indexOf('@'), newUser.email.length).includes('.')){
      
      return res.status(400).json({
       
          error: `Invalid email`
      })
     } 

     console.log(newUser.email.slice(newUser.email.indexOf('@'), newUser.email.length).includes('.'))

    // TODO: check user_name doesn't start with spaces

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      user_name
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              password: hashedPassword,
              first_name,
              last_name,
              email,
              date_created: 'now()',
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
    })

usersRouter
  .route('/:user_id')
  .get(requireAuthAdmin, (req, res, next) => {
    const { user_id } = req.params
    UsersService.getById(req.app.get('db'), user_id)
        .then(user => user)
  })
  .delete(requireAuthAdmin, (req, res, next) => {
      const { user_id } = req.params
      
      UsersService.deleteUser(req.app.get('db'), user_id)
        .then(() => {
            res.json(`User with ID of ${user_id} deleted`)  
        })
  })
  .patch(requireAuthAdmin, (req, res, next) => {
    const { user_id } = req.params
    let newUserStatus
    UsersService.checkUserStatus(req.app.get('db'), user_id, )
        .then((status) => {
            console.log(status)
            if(status.user_status === 'Active'){
                newUserStatus = 'Blocked'
            } else{ newUserStatus = 'Active'}

            UsersService.updateUserStatus(req.app.get('db'), user_id, newUserStatus)
                .then( res.json(`User Status Updated`))
        })
    
  })

usersRouter
  .route('/user-emails/:user_name')
  .get(requireAuth, (req, res, next) => {
    const { user_name } = req.params
    console.log(user_name)
    
    UsersService.getByUserName(req.app.get('db'), user_name)
        .then(user => {
         res.json(user.email)
      })
})

module.exports = usersRouter