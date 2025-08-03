// usar terminal: node Ejercicio2.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ingresa el valor de un lado del cuadrado: ", function(input) {
  const lado = parseFloat(input);
  const area = lado * lado;
  const perimetro = 4 * lado;

  console.log("Un lado del cuadrado: " + lado);
  console.log("Área: " + area);
  console.log("Perímetro: " + perimetro);

  rl.close();
});