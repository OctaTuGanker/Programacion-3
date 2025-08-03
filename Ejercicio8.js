// usar terminal: node Ejercicio8.js
class Proveedor {
  constructor(nombre, email, telefono) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
  }
}

class Articulo {
  constructor(nombre, proveedor, precio) {
    if (!(proveedor instanceof Proveedor)) {
      throw new Error("El proveedor debe ser una instancia de la clase Proveedor");
    }
    this.nombre = nombre;
    this.proveedor = proveedor;
    this.precio = precio;
  }

  telefono() {
    return {
      nombre: this.proveedor.nombre,
      telefono: this.proveedor.telefono
    };
  }
}

// Ejemplo de uso:
const proveedor1 = new Proveedor("Proveedor A", "contacto@proveedora.com", "123456789");
const articulo1 = new Articulo("Artículo X", proveedor1, 150.75);

console.log("Nombre del artículo:", articulo1.nombre);
console.log("Precio:", articulo1.precio);
console.log("Teléfono del proveedor:", articulo1.telefono());