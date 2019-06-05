"use strict";

const _generarMinimo = Symbol('generarMinimo');
const _generarMaximo = Symbol('generarMaximo');

class MisNumerosAleatorios {

	// Variables por defecto;
	constructor(minimo, maximo) {
		this.minimo = minimo;
		this.maximo = maximo;
	}

	// Métodos Privados
	[_generarMinimo](){
		return parseInt(String(this.minimo).padEnd(this.minimo, '0'));
	}
	[_generarMaximo](){
		return parseInt(String(this.maximo).padEnd(this.maximo, '9'));
	}

	// Métodos Públicos
	testMotor() {
		return String('El rango numérico seguro, soportado por tu motor compatible con el estándar ECMA es de "' + Number.MIN_SAFE_INTEGER + '" a "' + Number.MAX_SAFE_INTEGER + '".');
	}
	obtener() {
		return Math.floor(Math.random() * (this[_generarMaximo]() - this[_generarMinimo]() + 1) + this[_generarMinimo]());
	}
}

module.exports = MisNumerosAleatorios;
