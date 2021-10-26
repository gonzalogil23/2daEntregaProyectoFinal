import { Router } from "express";
import {
  getProductsFromChart,
  addProducts,
  deleteProducts,
} from "../controllers/carritoControl.js";

const carritoRouter = Router();

carritoRouter
  .get("/listaProductos", getProductsFromChart)
  .post("/agregarProducto/:id", addProducts)
  .delete("/borrarProducto/:id", deleteProducts);

export default carritoRouter;
