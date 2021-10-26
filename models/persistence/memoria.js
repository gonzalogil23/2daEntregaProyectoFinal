export default function Memoria() {
  this.connection = [];
  this.inicializateSchemas = () => {
    this.connection.productos = [];
    this.connection.carrito = [];
    return "Arrays en memoria inicializados";
  };
  this.create = (array, productos) => {
    this.connection[array].push(productos);
    return productos;
  };
  this.find = (array) => this.connection[array];
  this.findById = (array, id) =>
    this.connection[array].find((p) => p.id == id) || false;

  this.update = (array, id, productos) => {
    let index = this.connection[array].findIndex((p) => p.id == id);
    let product = this.findById(array, id);
    index && (this.connection[array][index] = { id: product.id, ...productos });
    return this.findById(array, id);
  };
  this.remove = (array, id) => {
    let index = this.connection[array].findIndex((p) => p.id == id);
    if (index > -1) {
      this.connection[array].splice(index, 1);
      return "Objeto borrado";
    } else {
      return false;
    }
  };
}
