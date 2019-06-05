"use strict"

var miFuncion = (etapa) => console.log("Etapa " + etapa + " completada.");

var llamarFuncion = (callback, tiempo, etapa) => setTimeout(callback, tiempo, etapa);

for (var etapa = 1; etapa < 5; etapa++) {
	llamarFuncion(miFuncion, 1000 * etapa, etapa);
}
