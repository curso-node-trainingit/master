"use strict";

const fs = require('fs');
var express = require('express');
var app = express();

app.get('/stream', function (req, res) {

	res.sendFile(__dirname + '/stream.html');

});

app.get('/loadStream', function (req, res) {

	const readerStream = fs.createReadStream('big.txt');
	readerStream.setEncoding('UTF8');

	var data = '';

	readerStream.on('data', (chunk) => {
	   data += chunk;
		res.write(chunk);
		console.log('Enviando porcion...\n');
	})

	readerStream.on('end',() => {
	   console.log('Se han enviado todas las porciones\n');
	})

	readerStream.on('error', (err) => {
	   console.log(err.stack);
	})

});
 
app.listen(3000)
