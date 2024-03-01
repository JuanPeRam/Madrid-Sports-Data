const gamesEndPoints = require("../web/games")

async function getCurrentGames(req,res){
    const endPoint = gamesEndPoints["23/24"];
    const result = await fetch(endPoint)
    const data = await result.text()
    res.send(data)
    console.log(result)
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
    const result = await fetch(endPoint)
    const data = await result.text()
    const jsonData = getJsonData(data)
    res.send(data)
}

function getJsonData(data){
    const dataArr = data.split('\r\n');
    const dataHeaders = dataArr[0].split('\t');
    console.log(dataHeaders)
    const finalData = []
    dataArr.map((dataRow, index)=>{
        const dataRowArray = dataRow.split('\t')
        if(index!=0){
            const dataRowObject = {}
            for(let i=0;i<dataRowArray.length;i++){
                dataRowObject[dataHeaders[i]] = dataRowArray[i]
            }
            finalData.push(dataRowObject)
        }
    })
}

module.exports = {
    getCurrentGames,getGamesBySeason
}