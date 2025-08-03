// usar terminal: node Ejercicio5.js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let litros, kilometros;

function pedirLitros() {
  rl.question("Ingrese los litros de nafta consumidos: ", function(input) {
    const valor = parseFloat(input);

    if (isNaN(valor) || valor <= 0) {
      console.log("Valor inválido, Ingreselo nuevamente.");
      pedirLitros();
    } else {
      litros = valor;
      pedirKilometros();
    }
  });
}

function pedirKilometros() {
  rl.question("Ingrese los kilómetros recorridos: ", function(input) {
    const valor = parseFloat(input);

    if (isNaN(valor) || valor <= 0) {
      console.log("Valor inválido, ingreselo de nuevo.");
      pedirKilometros();
    } else {
      kilometros = valor;
      mostrarConsumo();
    }
  });
}

function mostrarConsumo() {
  const consumo = litros / kilometros;
  console.log(`El consumo de combustible es de ${consumo.toFixed(2)} litros por kilómetro.`);
  rl.close();
}

pedirLitros();