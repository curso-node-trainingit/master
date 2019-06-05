"use strict";

var net = require('net');

var clientes = [];
var datosRecibidos = '';

var server = net.createServer(function(socket) {

	socket.write('Conexión establecida...');

	socket.on('data', function(data){

		datosRecibidos = data.toString('utf8');

		if(datosRecibidos.indexOf('cliente') !== -1){
			var cliente = datosRecibidos;

			clientes.push(socket);
			console.log('Se ha conectado: ' + cliente);

			socket.write('Bienvenido ' + cliente);

			if(clientes.length > 1){
				clientes.forEach(function(socket, index, array){
					socket.write('Se ha conectado: ' + cliente);
				});
			} else {
				setInterval(function(){
					clientes.forEach(function(socket, index, array){
						socket.write('ping');
					});
				}, 10000);
			}
		} else {
			console.log(datosRecibidos + '\n');
		}
	});

	socket.on('end', function(){
		console.log("Se ha desconectado un cliente.\n");
		clientes.splice(clientes.indexOf(socket), 1);
	});
});
server.listen(3000, '127.0.0.1');
