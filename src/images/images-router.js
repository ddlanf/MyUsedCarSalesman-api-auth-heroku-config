const express = require('express')
const ImagesService = require('./images-service');
const imagesRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

imagesRouter
    .route('/')
    .get((req, res, next) => {
        ImagesService.getAllImages(req.app.get('db'))
            .then(image => {
                res.json(image)
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

module.exports = imagesRouter