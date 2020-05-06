const express = require('express');
const app = express();
const db = require('./db')
const routes = require('./router')

// conexion a la base de datos
db.connect(app);

app.use(express.urlencoded())
app.use(express.json())

app.use(routes)

app.on('readyDB', () => {
  app.listen(5000, () => {
    console.log('aplicacion corriendo')
  })
})

console.log("probando");