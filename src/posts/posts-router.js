const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const { requireAuthAdmin } = require('../middleware/jwt-auth-admin')
const PostsService = require('./posts-service');
const states = require('./states')
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
               }  = req.body
        
        const newPost = {
            make, model, year, 
            mileage, description, 
            commission_amount, 
            location, price, 
            other_terms_and_conditions, 
            user_id : req.user.id
         }

        for(let [key, value] of Object.entries(newPost)){
            if(value == null || value === ''){
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
            }
        }

        if(!states.VerifyLocation(states.getCityFromInput(location), states.getStateFromInput(location))){
            return res.status(400).json({
                error: 'Invalid Location'
            })
        }

        if(price > 10000000){
            return res.status(400).json({
                error: `This car ain't worth that much brah`
            })
        }

        if(mileage > 5000000){
            return res.status(400).json({
                error: `Invalid mileage. In fact you'd be on the Guinness World Record if you have a car with ${mileage}`
            })
        }

        current_date = new Date()
        if(year > current_date.getFullYear()){
            return res.status(400).json({
                error: `you must be from the future`
            })
        }

        if(year <= 1895){
            return res.status(400).json({
                error: `dumbass`
            })
        }

        PostsService.insertPost(req.app.get('db'), newPost)
            .then(post => {
                res.json(post)
        })
            
    })
    
postsRouter
    .route('/by-user')
    .get(requireAuth, (req, res, next) => {
        PostsService.getAllPosts(req.app.get('db'))
            .then(posts => {
                userPost = posts.filter(post => post.user_name === req.user.user_name)
                res.json(userPost)
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
    .delete(requireAuth, (req, res, next) => {
        PostsService.deletePost(req.app.get('db'), req.params.post_id)
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
                    res.status(200).end()
            })
            .catch(next)
           
    })

postsRouter
    .route('/admin/:post_id')
    .delete(requireAuthAdmin, (req, res, next) => {
        PostsService.deletePost(req.app.get('db'), req.params.post_id)
            .then(post => {
                res.json(post)
             })
    })

module.exports = postsRouter