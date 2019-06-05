"use strict";

// Definimos librerias
const mariadb = require('mariadb');
const MongoClient = require('mongodb').MongoClient;

// Definimos conexión
const sqlconnect = mariadb.createPool({host: 'localhost', database: 'curso_node_sql', user: 'root', password: 'root', connectionLimit: 5});
const nosqlconnect = 'mongodb://localhost:27017';

// Definimos el usuario a actualizar y las variables que comprueban si ya existe.
global.existeSQL = false;
global.existeNoSQL = false;
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

// Actualizamos la información en nuestra base de datos SQL
sqlconnect.getConnection().then((conn) => {
	conn.query("SELECT * from usuarios").then((rows) => {
		rows.forEach((usuario) => {
			if(usuario.email === usuarioAnterior.email){
				existeSQL = true;
			}
		});
		if(existeSQL){
          		conn.query("UPDATE usuarios SET nickname = ?, nombre = ?, apellidos = ?, email = ? WHERE email = '" + usuarioAnterior.email + "'", [usuarioNuevo.nickname, usuarioNuevo.nombre, usuarioNuevo.apellidos, usuarioNuevo.email]).then((rows) => {
				console.log("\n\nSe ha actualizado correctamente el usuario en nuestra base de datos SQL.");
			})
			.catch((err) => {
				console.log('\n\nERROR: La información que se desea actualizar para el usuario ya existe para otro usuario.');
			});
			conn.end();
		} else {
			console.log('\n\nERROR: No existe el usuario con e-mail "' + usuarioAnterior.email + '" en nuestra base de datos SQL, insertalo.');
		}
		conn.end();
        })
});


// Actualizamos la información en nuestra base de datos NoSQL
MongoClient.connect(nosqlconnect, { useNewUrlParser: true }, (err, client) => {
	if (err) throw err;
	const db = client.db('curso_node_nosql');
	db.collection('usuarios').find({'email': usuarioAnterior.email}).toArray((err, docs) => {
		docs.forEach((usuario) => {
			if(usuario.email === usuarioAnterior.email){
				existeNoSQL = true;
			}
		});
		if(existeNoSQL){
		    db.collection('usuarios').update(usuarioAnterior, usuarioNuevo, (err, result) => {
			if (err) throw err;
			console.log("\nSe ha actualizado correctamente el usuario en nuestra base de datos NoSQL.");
			client.close();
		    });
		} else {
			console.log('\nERROR: No existe el usuario con e-mail "' + usuarioAnterior.email + '" en nuestra base de datos NoSQL, insertalo.');
		}
	});
});
