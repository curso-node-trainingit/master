var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/web'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const key = 'ClaveParaEncriptarYDesencriptarTodosLosTokens';

app.route('/registro')
  .get(function(req, res) {
    res.sendFile(__dirname + '/web/vistas/sign.html');
  })
  .post(function(req, res) {
	// Acciones cuando se recibe la información de registro
  });

app.route('/login')
  .get(function(req, res) {
	var token = req.cookies.JWT;
	if(token){
		// Si ya existe el token lo comprobamos
		if(validarToken(token)){
			res.redirect('/zona-segura');
			return;
		}
	}
	res.sendFile(__dirname + '/web/vistas/sign.html');
  })
  .post(function(req, res) {
	  var username = req.body.nickname
	  var password = req.body.password
	 
	  if( !(username === 'david' && password === '1234')){
		// usuario o contraseña inválidos
		res.redirect('/login');
		return;
	  }
	 
	  var tokenData = {
	    username: username
	    // Podemos añadir más datos para incluir en el Token
	  };
	 
	  var token = jwt.sign(tokenData, key, {
	     expiresIn: 60 * 60 * 24 // expira en 24 horas
	  });
	 
	if(validarToken(token)){
		res.cookie('JWT', token);
		res.redirect('/zona-segura');
	};
  });

app.route('/zona-segura').get(function(req, res) {
	var token = req.cookies.JWT;

	if(!token){
		// Es necesario el token
		res.redirect('/login');
		return;
	} else {
		// Validamos si el token es correcto.
		if(validarToken(token)){
			res.sendFile(__dirname + '/web/vistas/zona_segura.html');
		} else {
			res.redirect('/login');
		}
	}
	
});


function validarToken(token){
	var valido = false;
	newToken = token.replace('Bearer ', '');
 
	jwt.verify(newToken, key, function(err, user) {
		if (!err) {
			// El token es valido
			valido = true;
		}
	});

	return valido;
}

app.listen(process.env.port || 3000);
