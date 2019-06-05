"use strict";

const { exec } = require('child_process');
const MisNumerosAleatorios = require('./../mis_paquetes/index.js');

var minimoDigitos = 1;
var maximoDigitos = 2;
global.numero = new MisNumerosAleatorios(minimoDigitos, maximoDigitos);

console.log('\n\n');
var llamarApython = (number) => {
	console.log('ping.js envia ' + number + ' a pong.py\n');
	exec('py pong.py ' + number + '', (err, stdout, stderr) => {
		if (err) { return; }
		numero = parseInt(`${stdout}`);
		console.log('pong.py envia ' + numero + ' a ping.js\n');
		if(numero <= 100){
			numero = numero + 10;
			if(numero >= 100){
				console.log('\n\nHa ganado ping.js con el número ' + numero + '');
			} else {
				llamarApython(numero);
			}
		} else {
			console.log('\n\nHa ganado pong.py con el número ' + numero + '');
		}
		// console.log(`stderr: ${stderr}`);
	});	
}

llamarApython(numero.obtener());
