const express = require('express')

const { requireAuth } = require('../middleware/jwt-auth')
const PostsService = require('./posts-service');
const postsRouter = express.Router()
const jsonBodyParser = express.json()

postsRouter
    .route('/')
    .get((req, res, next) => {
        PostsService.getAllPosts(req.app.get('db'))
            .then(post => {
                res.json(post)
            })
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) =>{
        
        const { make, model, year, 
                mileage, description, 
                commission_amount, 
                location, price, 
                other_terms_and_conditions="N/A", 
                user_id } = req.body
        
        const newPost = {
            make, model, year, 
            mileage, description, 
            commission_amount, 
            location, price, 
            other_terms_and_conditions, 
            user_id }
        
        for(let [key, value] of Object.entries(newPost)){
            if(value == null){
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
            }
        }

        PostsService.insertPost(req.app.get('db'), newPost)
            .then(post => {
                res.json(post)
        })
            
    })
    
postsRouter
    .route('/:post_id')
    .get((req, res, next) => {
        PostsService.getById(req.app.get('db'), req.params.post_id)
            .then(post => {
                res.json(post)
             })
    })
    .patch(requireAuth, jsonBodyParser, (req, res, next) =>{
        
        const { make, model, year, 
            mileage, description, 
            commission_amount, 
            location, price, 
            other_terms_and_conditions } = req.body

        const postToUpdate = { 
            make, model, year, 
            mileage, description, 
            commission_amount, 
            location, price, 
            other_terms_and_conditions };

        const { post_id } = req.params 
  
        const numberOfValues = Object.values(postToUpdate).filter(Boolean).length
        if (numberOfValues === 0)
          return res.status(400).json({
            error: {
              message: `Request body must content at least one change`
            }
        })


        PostsService.updatePost(req.app.get('db'), postToUpdate, post_id)
            .then(numRowsAffected => {
                    res.status(204).end()
            })
            .catch(next)
           
    })

module.exports = postsRouter