"use strict";

var os = require('os');

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

console.log("\n");
console.log('Tipo de Sistema Operativo : ' + os.type());
console.log('Tipo de Plataforma : ' + os.platform());
console.log('Tipo de Arquitectura : ' + os.arch());
console.log('Procesadores : ', os.cpus());
console.log('Memoria RAM Total : ' + bytesToSize(os.totalmem()));
console.log('Memoria RAM Libre : ' + bytesToSize(os.freemem()));
console.log("\n");

