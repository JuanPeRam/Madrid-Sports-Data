const express = require('express')
const gamesController = require('../controllers/games')
const api = express.Router()

api.get('/games',gamesController.getCurrentGames)
api.get('/games/:season',gamesController.getGamesBySeason)
api.get('',(req,res)=>{res.send("Funcionando!")})

module.exports = api