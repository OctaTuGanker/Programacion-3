// usar terminal: node Ejercicio6.js
const readline = require('readline');

class Ficha {
  constructor(nombre) {
    this.nombre = nombre;
    this.sesiones = [];
    this.numsesiones = 0;
  }

  anotar(kilometros) {
    if (typeof kilometros === "number" && kilometros > 0) {
      this.sesiones.push(kilometros);
      this.numsesiones++;
    } else {
      console.log("Kilómetros inválidos, tiene que ser un número positivo.");
    }
  }

  media() {
    if (this.numsesiones === 0) return 0;
    const total = this.sesiones.reduce((sum, km) => sum + km, 0);
    return total / this.numsesiones;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let ficha;
let totalSesiones = 0;
let sesionesIngresadas = 0;

function pedirNombre() {
  rl.question("¿Cuál es tu nombre? ", (nombre) => {
    ficha = new Ficha(nombre);
    pedirNumeroDeSesiones();
  });
}

function pedirNumeroDeSesiones() {
  rl.question("¿Cuántas sesiones querés registrar? ", (input) => {
    const numero = parseInt(input);
    if (isNaN(numero) || numero <= 0) {
      console.log("Número inválido. Ingresá un número entero mayor a 0.");
      pedirNumeroDeSesiones();
    } else {
      totalSesiones = numero;
      pedirKilometros();
    }
  });
}

function pedirKilometros() {
  rl.question(`Kilómetros recorridos en la sesión ${sesionesIngresadas + 1}: `, (input) => {
    const km = parseFloat(input);
    if (isNaN(km) || km <= 0) {
      console.log("Ingresá un número válido de kilómetros.");
      pedirKilometros();
    } else {
      ficha.anotar(km);
      sesionesIngresadas++;

      if (sesionesIngresadas < totalSesiones) {
        pedirKilometros();
      } else {
        mostrarResultado();
        rl.close();
      }
    }
  });
}

function mostrarResultado() {
  console.log("\n ---Resumen---");
  console.log(`Nombre: ${ficha.nombre}`);
  console.log(`Sesiones registradas: ${ficha.numsesiones}`);
  console.log(`Kilómetros por sesión: ${ficha.sesiones.join(", ")}`);
  console.log(`Media de kilómetros por sesión: ${ficha.media().toFixed(2)} km`);
}

pedirNombre();