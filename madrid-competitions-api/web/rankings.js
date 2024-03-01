const { generalEndPoint, currentCompEndPoint } = require("./global");

const rankingsEndPoints = {
    "23/24":`${currentCompEndPoint}/clasificaciones_20240229.txt`,
    "22/23":`${generalEndPoint}/clasificaciones_20230630.txt`,
    "21/22":`${generalEndPoint}/clasificaciones_20220630.txt`,
    "20/21":`${generalEndPoint}/clasificaciones_2020_2021.txt`,
    "18/19": `${generalEndPoint}/clasificaciones_2018_2019.txt`,
    "17/18": `${generalEndPoint}/clasificaciones_2017_2018.txt`,
    "16/17": `${generalEndPoint}/clasificaciones_2016_2017.txt`,
    "15/16": `${generalEndPoint}/clasificaciones_2015_2016.txt`,
    "14/15": `${generalEndPoint}/clasificaciones_2014_2015.txt`,
}

const rankingKeys = [
    "Codigo_temporada",
    "Codigo_competicion",
    "Codigo_fase",
    "Codigo_grupo",
    "Codigo_equipo",
    "Posicion",
    "Puntos",
    "Partidos_jugados",
    "Partidos_ganados",
    "Partidos_empatados",
    "Partidos_perdidos",
    "Goles_favor",
    "Goles_contra",
    "Nombre_temporada",
    "Nombre_competicion",
    "Nombre_fase",
    "Nombre_grupo",
    "Nombre_deporte",
    "Nombre_categoria",
    "Nombre_equipo",
    "Nombre-Sexo",
    "Nombre_distrito"
];
module.exports = {rankingsEndPoints,rankingKeys}