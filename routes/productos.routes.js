import { Router } from "express";
import {
  getProducts,
  addProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productosControl.js";

const productosRouter = Router();

productosRouter
  .get("/", getProducts)
  .post("/agregarProducto", addProducts)
  .put("/actualizarProducto/:id", updateProduct)
  .delete("/borrarProducto/:id", deleteProduct);

export default productosRouter;
