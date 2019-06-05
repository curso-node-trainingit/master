"use strict";

var net = require('net');
var cliente = new net.Socket();
var miNombre = 'cliente_' + Math.floor((Math.random() * 100) + 1);
var datosRecibidos = '';

cliente.connect(3000, '127.0.0.1', function() {
	console.log('\n\nConectando...\n\n');
	cliente.write(miNombre);
});

cliente.on('data', function(data) {
	
	datosRecibidos = data.toString('utf8');
	
	console.log('Mensaje del Servidor Socket: ' + datosRecibidos);

	if(datosRecibidos == 'ping') {
		cliente.write('pong');
	}
});

cliente.on('close', function() {
	console.log('La comunicación se ha cerrado.');
});

