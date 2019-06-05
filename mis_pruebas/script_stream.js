"use strict";

const Stream = require('stream');

const readableStream = new Stream.Readable();
const writableStream = new Stream.Writable();

writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString());
    next();
}

readableStream.push('Mis_Datos_1');
readableStream.push('Mis_Datos_2');
readableStream.push('Mis_Datos_3');
readableStream.push(null);

readableStream.pipe(writableStream)
