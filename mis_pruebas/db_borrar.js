"use strict";

// Definimos librerias
const mariadb = require('mariadb');
const MongoClient = require('mongodb').MongoClient;

// Definimos conexión
const sqlconnect = mariadb.createPool({host: 'localhost', database: 'curso_node_sql', user: 'root', password: 'root', connectionLimit: 5});
const nosqlconnect = 'mongodb://localhost:27017';

// Definimos los usuarios que vamos a borrar.
global.usuarioAnterior = {
	nickname : 'only',
	nombre : 'david',
	apellidos : 'palmero',
	email : 'prueba@gmail.com'
};
global.usuarioNuevo = {
	nickname : 'only_actualizado',
	nombre : 'david_actualizado',
	apellidos : 'palmero_actualizado',
	email : 'actualizado@gmail.com'
};

// Borrar los usuarios en nuestra base de datos SQL
sqlconnect.getConnection().then((conn) => {
	conn.query("SELECT * from usuarios").then((rows) => {
  		conn.query("DELETE FROM usuarios WHERE email = '" + usuarioAnterior.email + "'").catch((err) => {});
  		conn.query("DELETE FROM usuarios WHERE email = '" + usuarioNuevo.email + "'").catch((err) => {});
		console.log("\n\nSe han borrado correctamente los usuarios en nuestra base de datos SQL.");
		conn.end();
        })
});

// Borrar los usuarios en nuestra base de datos NoSQL
MongoClient.connect(nosqlconnect, { useNewUrlParser: true }, (err, client) => {
	if (err) throw err;
	const db = client.db('curso_node_nosql');
	db.collection('usuarios').deleteOne(usuarioAnterior, (err, result) => {client.close()});
	db.collection('usuarios').deleteOne(usuarioNuevo, (err, result) => {client.close()});
	console.log("\nSe han borrado correctamente los usuarios en nuestra base de datos NoSQL.");
});
