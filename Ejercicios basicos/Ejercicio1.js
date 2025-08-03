// usar terminal: node Ejercicio1.js

const precioProducto = 300;

const iva = 21;

const montoIVA = (precioProducto * iva) / 100;

const precioTotal = precioProducto + montoIVA;

console.log("Precio del producto: $" + precioProducto);
console.log("IVA (" + iva + "%): $" + montoIVA.toFixed(2));
console.log("Precio total a pagar: $" + precioTotal.toFixed(2));