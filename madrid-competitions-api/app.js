const express = require('express')
const app = express()

app.use(express.json())
app.use((req, res, next) => {
  const allowedOrigins = {
    'http://localhost:5173': ['GET'],
    'https://sansugusfc.netlify.app': ['GET','POST']
  };

  const origin = req.headers.origin;

  if (allowedOrigins.hasOwnProperty(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', allowedOrigins[origin].join(', '));
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
  });
app.use(express.urlencoded({extended: true}))

//Cargar rutas
const games_routes = require('./routes/games')
const rankings_routes = require('./routes/rankings')
const seasons_routes = require('./routes/season')
// Rutas base
app.use("/",games_routes,rankings_routes,seasons_routes)

module.exports = app