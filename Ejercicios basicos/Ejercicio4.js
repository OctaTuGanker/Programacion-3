// usar terminal: node Ejercicio4.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numeros = [];
let contador = 0;

function pedirNumero() {
  rl.question(`Ingresa el número entero ${contador + 1}: `, function(input) {
    const numero = Number(input);

    if (!Number.isInteger(numero)) {
      console.log("Eso no es un número entero válido. Ingreselo nuevamene");
      pedirNumero();
    } else {
      numeros.push(numero);
      contador++;

      if (contador < 3) {
        pedirNumero(); 
      } else {

        const promedio = (numeros[0] + numeros[1] + numeros[2]) / 3;
        console.log(`El promedio de los tres números es: ${promedio}`);
        rl.close();
      }
    }
  });
}

pedirNumero();