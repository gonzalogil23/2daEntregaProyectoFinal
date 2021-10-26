import mongoose from "mongoose";

const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  code: String,
  image: String,
  price: String,
  stock: String,
  timestamp: Date,
});

export const Productos = mongoose.model(productosCollection, ProductosSchema);
