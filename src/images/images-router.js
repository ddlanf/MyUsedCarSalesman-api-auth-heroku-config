const express = require('express')
const ImagesService = require('./images-service');
const imagesRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

imagesRouter
    .route('/')
    .get((req, res, next) => {
        ImagesService.getAllImages(req.app.get('db'))
            .then(images => {
                res.json(images)
            })
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) =>{
        const { src, alt, post_id } = req.body;
        
        const newImage = { src, alt, post_id };

        for(let [key, value] of Object.entries(newImage)){
            if(value == null){
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
            }
        }

        ImagesService.insertImage(req.app.get('db'), newImage)
        .then(post => {
            res.json(post)
        })
            
    })

    
imagesRouter
    .route('/:post_id')
    .get((req, res, next) => {
        ImagesService.getById(req.app.get('db'), req.params.post_id)
            .then(image => {
                res.json(image)
             })
    })
    .patch(requireAuth, jsonBodyParser, (req, res, next) =>{
        const { src, alt } = req.body;
        
        const { post_id } = req.params
        
        const newImage = { src, alt, post_id };
  
        const numberOfValues = Object.values(newImage).filter(Boolean).length
        if (numberOfValues === 0)
          return res.status(400).json({
            error: {
              message: `Request body must content at least one change`
            }
        })

        ImagesService.updateImage(req.app.get('db'), newImage, post_id)
            .then(image => {
                return res.status(200).json(image)
        })
            
    })

module.exports = imagesRouter