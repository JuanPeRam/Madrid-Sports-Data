const {rankingsEndPoints, rankingKeys} = require("../web/rankings");


async function getCurrentRanking(req,res){
    const endPoint = rankingsEndPoints["23/24"];
    const jsonData = await fetchJsonData(endPoint,'\r\n')
    res.send(jsonData)
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
    if(season == '21/22') {
        rowSplitter = /[\r\n]/
        jsonData = await fetchJsonData(endPoint,rowSplitter,rankingKeys)
    }
    else if(season == '22/23') {
        rowSplitter = /[\r\n]/
        jsonData = await fetchJsonData(endPoint,rowSplitter,rankingKeys)
    }
    else jsonData = await fetchJsonData(endPoint,rowSplitter)
    res.send(jsonData.filter((row)=>row['Codigo_temporada']!=""))
}

async function fetchJsonData(endPoint,rowSplitter,dataHeaders){
    const result = await fetch(endPoint)
    const data = await result.text()
    const fixedData = data.replaceAll('�','')
    const jsonData = getJsonData(fixedData,rowSplitter,dataHeaders)
    return jsonData
}

function getJsonData(data,rowSplitter, dataHeaders){
    const dataArr = data.split(rowSplitter);
    if(!dataHeaders) {
        dataHeaders = dataArr[0].split(/[;\t]/);
    }
    const finalData = []
    dataArr.map((dataRow, index)=>{
        const dataRowArray = dataRow.split(/[;\t]/)
        if(index!=0){
            const dataRowObject = {}
            for(let i=0;i<dataRowArray.length;i++){
                dataRowObject[dataHeaders[i] ?? ''] = dataRowArray[i].trim().replaceAll('\u0000','')
            }
            finalData.push(dataRowObject)
        }
    })
    return finalData
}

module.exports = {
    getCurrentRanking,getRankingsBySeason
}