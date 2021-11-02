import mongoose from "mongoose";
import { Carrito } from "./schemas/carrito.js";
import { Productos } from "./schemas/productos.js";

export default function Mongo(URI, options) {
  this.connection = mongoose;
  this.id = async (id) => await mongoose.Types.ObjectId.isValid(id);

  this.inicializateSchemas = async () => {
    await mongoose.connect(URI, options);
    await Productos.deleteMany({});
    await Carrito.deleteMany({});
    console.log("Conectado a la base de datos Mongo.");
  };
  this.create = async (collection, producto) => {
    let Collection = collection === "productos" ? Productos : Carrito;
    if (collection === "productos") {
      const { name } = producto;
      let checkExists = await Collection.exists({ name });
      if (checkExists) return "The product already exists.";
    }
    const newProduct = new Collection(producto);
    await newProduct.save();
    return newProduct;
  };

  this.find = (collection) => {
    let Collection = collection === "productos" ? Productos : Carrito;
    return Collection.find({});
  };

  this.findById = async (collection, id) => {
    let Collection = collection === "products" ? Productos : Carrito;

    if (this.id(id)) {
      let foundById = await Collection.findById(this.id(id));
      return foundById || false;
    } else {
      return "No valid ID.";
    }
  };

  this.update = async (collection, id, producto) => {
    let Collection = collection === "products" ? Productos : Carrito;

    if (this.id(id)) {
      let updatedProduct = await Collection.findByIdAndUpdate(
        { _id: id },
        producto
      );
      if (updatedProduct) return await this.findById(collection, id);
    } else {
      return "No valid ID.";
    }
  };
  this.delete = async (collection, id) => {
    let Collection = collection === "products" ? Productos : Carrito;

    if (this.id(id)) {
      let deletedProduct = await Collection.findByIdAndDelete(id);
      if (deletedProduct) return "Objeto borrado";
    } else {
      return "No valid ID.";
    }
  };
}
