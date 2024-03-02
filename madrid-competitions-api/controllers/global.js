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
    fetchJsonData, getJsonData
}