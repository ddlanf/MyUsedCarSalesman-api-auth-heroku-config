const express = require('express')
//const path = require('path')
//const ReportsService = require('./reports-service');
const reportsRouter = express.Router()

reportsRouter
    .route('/')
    .get((req, res, next) => {
        
    })

module.exports = reportsRouter