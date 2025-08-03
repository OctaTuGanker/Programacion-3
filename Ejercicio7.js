// usar terminal: node Ejercicio7.js
const readline = require('readline');

class Cliente {
  constructor(nombre, email, telefono) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
  }
}

class Factura {
  constructor(cliente, total) {
    this.cliente = cliente; 
    this.total = total;
    this.estado = "pendiente";
  }

  cobrar() {
    this.estado = "pagada";
  }

  imprimir() {
    console.log("\nFactura");
    console.log("Cliente:", this.cliente.nombre);
    console.log("Email:", this.cliente.email);
    console.log("Teléfono:", this.cliente.telefono);
    console.log("Total: $" + this.total.toFixed(2));
    console.log("Estado:", this.estado);
    console.log("-------------------------");
  }
}

class Gestor {
  constructor() {
    this.clientes = [];
    this.facturas = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  iniciar() {
    console.log("Ingrese clientes (escriba 'fin' cuando termine):");
    this.pedirCliente();
  }

  pedirCliente() {
    this.rl.question("Nombre del cliente: ", (nombre) => {
      if (nombre.toLowerCase() === 'fin') {
        if (this.clientes.length === 0) {
          console.log("Debes ingresar al menos un cliente.");
          return this.pedirCliente();
        }
        return this.mostrarMenu();
      }

      this.rl.question("Email del cliente: ", (email) => {
        this.rl.question("Teléfono del cliente: ", (telefono) => {
          const nuevoCliente = new Cliente(nombre, email, telefono);
          this.clientes.push(nuevoCliente);
          console.log(`Cliente ${nombre} agregado.\n`);
          this.pedirCliente();
        });
      });
    });
  }

  mostrarMenu() {
    console.log("\n=== MENÚ ===");
    console.log("1. Listar clientes");
    console.log("2. Crear factura");
    console.log("3. Cobrar factura");
    console.log("4. Imprimir facturas");
    console.log("5. Salir");
    this.rl.question("Seleccione una opción: ", (opcion) => {
      switch (opcion) {
        case '1':
          this.listarClientes();
          break;
        case '2':
          this.crearFactura();
          break;
        case '3':
          this.cobrarFactura();
          break;
        case '4':
          this.imprimirFacturas();
          break;
        case '5':
          console.log("Saliendo...");
          this.rl.close();
          break;
        default:
          console.log("Opción inválida.");
          this.mostrarMenu();
      }
    });
  }

  listarClientes() {
    if (this.clientes.length === 0) {
      console.log("No hay clientes registrados.");
    } else {
      console.log("\nLista de clientes:");
      this.clientes.forEach((cliente, index) => {
        console.log(`${index}: ${cliente.nombre} - ${cliente.email} - ${cliente.telefono}`);
      });
    }
    this.mostrarMenu();
  }

  crearFactura() {
    if (this.clientes.length === 0) {
      console.log("No hay clientes registrados. Agrega primero clientes.");
      return this.mostrarMenu();
    }

    this.rl.question("Ingrese el ID del cliente para la factura(ej: 01): ", (id) => {
      const idNum = parseInt(id);
      if (isNaN(idNum) || idNum < 0 || idNum >= this.clientes.length) {
        console.log("ID de cliente inválido.");
        return this.crearFactura();
      }
      this.rl.question("Ingrese el total de la factura: ", (total) => {
        const totalNum = parseFloat(total);
        if (isNaN(totalNum) || totalNum <= 0) {
          console.log("Total inválido.");
          return this.crearFactura();
        }
        const factura = new Factura(this.clientes[idNum], totalNum);
        this.facturas.push(factura);
        console.log("Factura creada correctamente.");
        this.mostrarMenu();
      });
    });
  }

  cobrarFactura() {
    const pendientes = this.facturas.filter(f => f.estado === 'pendiente');
    if (pendientes.length === 0) {
      console.log("No hay facturas pendientes para cobrar.");
      return this.mostrarMenu();
    }
    console.log("\nFacturas pendientes:");
    pendientes.forEach((f, i) => {
      const idx = this.facturas.indexOf(f);
      console.log(`${idx}: Cliente: ${f.cliente.nombre}, Total: $${f.total.toFixed(2)}`);
    });

    this.rl.question("Ingrese el número de factura a cobrar: ", (id) => {
      const idNum = parseInt(id);
      if (isNaN(idNum) || idNum < 0 || idNum >= this.facturas.length) {
        console.log("Número de factura inválido.");
        return this.cobrarFactura();
      }
      if (this.facturas[idNum].estado === 'pagada') {
        console.log("La factura ya está pagada.");
        return this.mostrarMenu();
      }
      this.facturas[idNum].cobrar();
      console.log("Factura cobrada.");
      this.mostrarMenu();
    });
  }

  imprimirFacturas() {
    if (this.facturas.length === 0) {
      console.log("No hay facturas para mostrar.");
    } else {
      this.facturas.forEach(f => f.imprimir());
    }
    this.mostrarMenu();
  }
}

const gestor = new Gestor();
gestor.iniciar();