const {rankingsEndPoints, rankingKeys} = require("../web/rankings");
const { fetchJsonData } = require("./global");


async function getCurrentRanking(req,res){
    const endPoint = rankingsEndPoints["23/24"];
    const jsonData = await fetchJsonData(endPoint,'\r\n')
    res.json(jsonData)
}

async function getRankingsBySeason(req,res){
    const season = req.params.season
    if(!rankingsEndPoints[season]){
        res.json({
            status: 404,
            error: "Season Not Found"
        })
        res.status(404)
        return
    }
    const endPoint = rankingsEndPoints[season]
    let rowSplitter = '\r\n'
    let jsonData
    let headerKeys
    if(season == '21/22' || season=='22/23') {
        rowSplitter = /[\r\n]/
        headerKeys = rankingKeys
    }
    jsonData = await fetchJsonData(endPoint,rowSplitter,headerKeys)
    res.json(jsonData.filter((row)=>row['Codigo_temporada']!=""))
}

module.exports = {
    getCurrentRanking,getRankingsBySeason
}