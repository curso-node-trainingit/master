"use strict";

var fs = require('fs');
var readline = require('readline');

var cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var respuestas = '';

cli.question("\nEscribe tu nombre y pulsa enter: \n\n", (respuesta) => {
	respuestas += respuesta + "\n";
	const archivo = './archivo.txt'

	fs.writeFile(archivo, respuestas, (err) => {}); 

	cli.close();
});


