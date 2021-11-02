import { Carrito } from "../models/classModels/Carrito.js";
// import fs from "fs";
import db from "../server.js";

const chart = new Carrito();

export const getProductsFromChart = async (req, res) => {
  let carritoProducts = await db.find("carrito");
  return res.status(200).json(carritoProducts);
};

export const addProducts = async (req, res) => {
  let { body } = req;
  chart.products.push(body);
  let newProduct = await db.create("carrito", body);
  return res.json(newProduct);
};

export const deleteProducts = async (req, res) => {
  let { id } = req.params;
  let productToDelete = await db.delete("carrito", id);
  res.json(productToDelete);
};
