"use strict";

// Definimos librerias
var http = require("http");

// Mostramos todos los usuarios
http.get('http://localhost:3000/api/get/usuarios', (respuesta) => {
    var responseString = '';

    respuesta.on("data", function (data) {
        responseString += data;
    });
    respuesta.on("end", function () {

	console.log('\n\nMostrar la información de todos los usuarios:\n');

	var usuarios = JSON.parse(responseString);
	if(Object.keys(usuarios).length === 0){
		console.log('ERROR :: No hay usuarios que mostrar.\n');
	} else {
		
		usuarios.forEach((usuario) => {
			console.log('id: ' + usuario.id + '');
			console.log('nickname: ' + usuario.nickname + '');
			console.log('nombre: ' + usuario.nombre + '');
			console.log('apellidos: ' + usuario.apellidos + '');
			console.log('email: ' + usuario.email +'\n');
		});
	}
    });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});


// Mostramos solo la información del usuario "Only", si existe.

var nickname = 'only';

http.get('http://localhost:3000/api/get/usuario/by-nickname/' + nickname + '', (respuesta) => {
    var responseString = '';

    respuesta.on("data", function (data) {
        responseString += data;
    });
    respuesta.on("end", function () {

	console.log('\n\nInformación únicamente del usuario ' + nickname + ':\n');

	if(responseString === ''){
		console.log('ERROR :: El usuario no existe.\n');
	} else {
		var usuario = JSON.parse(responseString);
		console.log('id: ' + usuario.id + '');
		console.log('nickname: ' + usuario.nickname + '');
		console.log('nombre: ' + usuario.nombre + '');
		console.log('apellidos: ' + usuario.apellidos + '');
		console.log('email: ' + usuario.email +'\n');
	}
    });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
