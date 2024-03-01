const express = require('express')
const seasonsController = require('../controllers/seasons')
const api = express.Router()

api.get('/seasons',seasonsController.getSeasons)

module.exports = api