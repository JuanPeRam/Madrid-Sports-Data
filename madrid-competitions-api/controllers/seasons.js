const { rankingsEndPoints } = require("../web/rankings")

function getSeasons(req,res){
    const seasons = Object.keys(rankingsEndPoints)
    res.json(seasons)
}

module.exports = {
    getSeasons
}