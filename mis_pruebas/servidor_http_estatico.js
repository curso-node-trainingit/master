var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('Hola Mundo!')
})

app.get('/contacto', function (req, res) {
  res.send('Aquí estará la página de Contacto!')
})

app.get('/registro', function (req, res) {
  res.send('Aquí estará la página de Registro!')
})
 
app.listen(3000)
