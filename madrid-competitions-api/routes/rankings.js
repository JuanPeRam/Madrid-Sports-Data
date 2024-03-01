const express = require('express')
const rankingsController = require('../controllers/rankings')
const api = express.Router()

api.get('/ranking',rankingsController.getCurrentRanking)
api.get('/ranking/:season',rankingsController.getRankingsBySeason)

module.exports = api