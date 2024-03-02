const {gamesEndPoints, gamesKeys} = require("../web/games");
const { fetchJsonData } = require("./global");

async function getCurrentGames(req,res){
    const endPoint = gamesEndPoints["23/24"];
    const jsonData = await fetchJsonData(endPoint,'\r\n')
    res.send(jsonData)
}

async function getGamesBySeason(req,res){
    const season = req.params.season
    if(!gamesEndPoints[season]){
        res.json({
            status: 404,
            error: "Season Not Found"
        })
        res.status(404)
        return
    }
    const endPoint = gamesEndPoints[season]
    let headerKeys
    let rowSplitter = '\r\n'
    if(season == '21/22' || season=='22/23') {
        rowSplitter = /[\r\n]/
        headerKeys = gamesKeys
    }
    const jsonData = await fetchJsonData(endPoint,rowSplitter,headerKeys);
    res.send(jsonData.filter((row)=>row['Codigo_temporada']!=""))
}

module.exports = {
    getCurrentGames,getGamesBySeason
}