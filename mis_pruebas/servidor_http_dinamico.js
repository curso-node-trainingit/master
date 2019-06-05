var express = require('express')
var app = express()
 
app.get('/producto/:number', function (req, res) {
  res.send('el numero de producto es el: ' + req.params.number);
})
 
app.listen(3000)
