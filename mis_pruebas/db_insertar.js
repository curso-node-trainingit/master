"use strict";

// Definimos librerias
const mariadb = require('mariadb');
const MongoClient = require('mongodb').MongoClient;

// Definimos conexión
const sqlconnect = mariadb.createPool({host: 'localhost', database: 'curso_node_sql', user: 'root', password: 'root', connectionLimit: 5});
const nosqlconnect = 'mongodb://localhost:27017';

// Definimos el usuario a insertar y las variables que comprueban si ya existe.
global.existeSQL = false;
global.existeNoSQL = false;
global.nuevoUsuario = {
	nickname : 'only',
	nombre : 'david',
	apellidos : 'palmero',
	email : 'prueba@gmail.com'
};

// Insertamos la información en nuestra base de datos SQL
sqlconnect.getConnection().then((conn) => {
	conn.query("SELECT * from usuarios").then((rows) => {
		rows.forEach((usuario) => {
			if(usuario.email === nuevoUsuario.email){
				existeSQL = true;
			}
		});
		if(!existeSQL){
          		conn.query("INSERT INTO usuarios (nickname, nombre, apellidos, email) VALUES (?, ?, ?, ?)", [nuevoUsuario.nickname, nuevoUsuario.nombre, nuevoUsuario.apellidos, nuevoUsuario.email]);
			console.log("\n\nSe ha insertado correctamente el usuario en nuestra base de datos SQL.");
			conn.end();
		} else {
			console.log('\n\nERROR: El usuario con e-mail "' + nuevoUsuario.email + '" ya existe en nuestra base de datos SQL.');
		}
		conn.end();
        })
});


// Insertamos la información en nuestra base de datos NoSQL
MongoClient.connect(nosqlconnect, { useNewUrlParser: true }, (err, client) => {
	if (err) throw err;
	const db = client.db('curso_node_nosql');
	db.collection('usuarios').find(nuevoUsuario).toArray((err, docs) => {
		docs.forEach((usuario) => {
			if(usuario.email === nuevoUsuario.email){
				existeNoSQL = true;
			}
		});
		if(!existeNoSQL){
		    db.collection('usuarios').insertOne(nuevoUsuario, (err, result) => {
			if (err) throw err;
			console.log("\nSe ha insertado correctamente el usuario en nuestra base de datos NoSQL.");
			client.close();
		    });
		} else {
			console.log('\nERROR: El usuario con e-mail "' + nuevoUsuario.email + '" ya existe en nuestra base de datos NoSQL.');
		}
	});
});
