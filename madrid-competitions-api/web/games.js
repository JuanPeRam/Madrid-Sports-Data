const { generalEndPoint, currentGamesEndPoint } = require("./global");

const gamesEndPoints = {
    "23/24":`${currentGamesEndPoint}/Partidos_20240229.txt`,
    "22/23":`${generalEndPoint}/Partidos_20220630.txt`,
    "21/22":`${generalEndPoint}/Partidos20220630.txt`,
    "20/21":`${generalEndPoint}/Partidos_2020_2121.txt`,
    "18/19": `${generalEndPoint}/Partidos_2018_2019.txt`,
    "17/18": `${generalEndPoint}/Partidos_2017_2018.txt`,
    "16/17": `${generalEndPoint}/Partidos_2016_2017.txt`,
    "15/16": `${generalEndPoint}/Partidos_2015_2016.txt`,
    "14/15": `${generalEndPoint}/partidos_2014_2015.txt`,
}
module.exports = gamesEndPoints