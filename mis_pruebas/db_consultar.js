"use strict";

// Definimos librerias
const mariadb = require('mariadb');
const MongoClient = require('mongodb').MongoClient;

// Definimos conexión
const sqlconnect = mariadb.createPool({host: 'localhost', database: 'curso_node_sql', user: 'root', password: 'root', connectionLimit: 5});
const nosqlconnect = 'mongodb://localhost:27017';

// Consultamos la información en nuestra base de datos SQL
sqlconnect.getConnection().then((conn) => {
	conn.query("SELECT * from usuarios").then((rows) => {
		console.log('\n\nLos usuarios de nuestra base de datos relacional SQL son:\n');
		rows.forEach((usuario) => {
			console.log('id: ' + usuario.id + '');
			console.log('nickname: ' + usuario.nickname + '');
			console.log('nombre: ' + usuario.nombre + '');
			console.log('apellidos: ' + usuario.apellidos + '');
			console.log('email: ' + usuario.email +'\n');
		});
		conn.end();
        })
});


// Consultamos la información en nuestra base de datos NoSQL
MongoClient.connect(nosqlconnect, { useNewUrlParser: true }, (err, client) => {
	if (err) throw err;
	const db = client.db('curso_node_nosql');
	db.collection('usuarios').find({}).toArray((err, docs) => {
		console.log('\n\nLos usuarios de nuestra base de datos no relacional NoSQL son:\n');
		docs.forEach((usuario) => {
			console.log('id: ' + usuario._id + '');
			console.log('nickname: ' + usuario.nickname + '');
			console.log('nombre: ' + usuario.nombre + '');
			console.log('apellidos: ' + usuario.apellidos + '');
			console.log('email: ' + usuario.email +'\n');
		});
		client.close();
	});
});
