"use strict";

var webSocketServer = require('websocket').server;
var http = require('http');

var historial = [];
var clientes = [];

var colores = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
colores.sort(function(a,b) { return Math.random() > 0.5; } );

var puerto = 1338;
var server = http.createServer(function(request, response) {});
server.listen(puerto, function() {
    console.log('Servidor escuchando en el puerto ' + puerto);
});


var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin); 
    var index = clientes.push(connection) - 1;
    var userName = false;
    var userColor = false;

    console.log('Conexión aceptada.');

    if (historial.length > 0) {
        connection.sendUTF(JSON.stringify( { type: 'history', data: historial} ));
    }

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            if (userName === false) {
                userName = message.utf8Data;
                userColor = colores.shift();
                connection.sendUTF(JSON.stringify({ type:'color', data: userColor }));
                console.log('Usuario conocido como: ' + userName + ' con color ' + userColor + '.');

            } else {
                console.log('Mensaje recibido de: ' + userName + ': ' + message.utf8Data);
                
                var obj = {
                    time: (new Date()).getTime(),
                    text: message.utf8Data,
                    author: userName,
                    color: userColor
                };
                historial.push(obj);
                historial = historial.slice(-100);

                var json = JSON.stringify({ type:'message', data: obj });
                for (var i=0; i < clientes.length; i++) {
                    clientes[i].sendUTF(json);
                }
            }
        }
    });

    connection.on('close', function(connection) {
        if (userName !== false && userColor !== false) {
            console.log((new Date()) + " Cliente " + connection.remoteAddress + " desconectado.");
            clientes.splice(index, 1);
            colores.push(userColor);
        }
    });

});
