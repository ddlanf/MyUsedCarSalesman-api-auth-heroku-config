const express = require('express')
//const path = require('path')
//const PostsService = require('./posts-service');
const postsRouter = express.Router()

postsRouter
    .route('/')
    .get((req, res, next) => {
        
    })

module.exports = postsRouter