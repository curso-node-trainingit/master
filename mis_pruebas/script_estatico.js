"use strict";

const fs = require('fs');

const archivo = './archivo.txt'
var existeArchivo = false;

if (fs.existsSync(archivo)) {
	existeArchivo = true;
}

if(existeArchivo){
	fs.readFile(archivo, 'utf-8', (err, data) => {
        	console.log(`\n El contenido del fichero 'archivo.txt' es: \n\n ${data} \n`);
	});
}


