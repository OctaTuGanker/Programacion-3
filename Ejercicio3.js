// usar terminal: node Ejercicio3.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Escribe tu nombre: ", function(nombre) {
  console.log("Hola " + nombre);
  rl.close();
});