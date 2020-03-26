const express = require('express')
const ReportsService = require('./reports-service');
const { requireAuthAdmin } = require('../middleware/jwt-auth-admin')
const reportsRouter = express.Router()

reportsRouter
    .route('/')
    .get(requireAuthAdmin, (req, res, next) => {
        ReportsService.getAllReports(req.app.get('db'))
            .then(report => {
                res.json(report)
            })
    })

module.exports = reportsRouter