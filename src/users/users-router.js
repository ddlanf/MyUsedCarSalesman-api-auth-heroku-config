const express = require('express')
//const path = require('path')
//const UsersService = require('./users-service');
const usersRouter = express.Router()

usersRouter
    .route('/')
    .get((req, res, next) => {
    })

module.exports = usersRouter