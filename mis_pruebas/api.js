"use strict";

// Definimos librerias
var express = require('express')
var mariadb = require('mariadb');
var app = express()

// Definimos conexión
const sqlconnect = mariadb.createPool({host: 'localhost', database: 'curso_node_sql', user: 'root', password: 'root', connectionLimit: 5});

app.get('/api/get/usuarios', function (req, res) {

	// Consultamos la información en nuestra base de datos SQL
	sqlconnect.getConnection().then((conn) => {
		conn.query("SELECT * from usuarios").then((usuarios) => {
			res.send(usuarios);
			conn.end();
		})
	});
})

app.get('/api/get/usuario/by-nickname/:nickname', function (req, res) {

	// Consultamos la información en nuestra base de datos SQL
	sqlconnect.getConnection().then((conn) => {
		conn.query("SELECT * from usuarios WHERE nickname = '" + req.params.nickname + "'").then((usuario) => {
			res.send(usuario[0]);
			conn.end();
		})
	});
})

app.listen(3000)
