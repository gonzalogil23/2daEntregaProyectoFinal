import mongoose from "mongoose";

const carritoCollection = "carrito";

const carritoSchema = new mongoose.Schema({
  timestamp: { type: Date },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

export const Carrito = mongoose.model(carritoCollection, carritoSchema);
