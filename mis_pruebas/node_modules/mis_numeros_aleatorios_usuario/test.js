"use strict";

const MisNumerosAleatorios = require('./index.js');

var minimoDigitos = 10;
var maximoDigitos = 15;
var Lnumeros = new MisNumerosAleatorios(minimoDigitos, maximoDigitos);

console.log('\n' + Lnumeros.testMotor() + '\n');
console.log('Obteniendo un numero aleatorio de ' + minimoDigitos + ' a ' + maximoDigitos + ' digitos => ' + Lnumeros.obtener() + '\n');



