import Express from "express";
import carritoRouter from "./routes/carrito.routes.js";
import productosRouter from "./routes/productos.routes.js";

const app = Express();

app.use(Express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hola Root" });
});

const errorHandler = (err, req, res) => {
  if (!err) {
    return res.status(409);
  } else {
    return res.json({
      error: -1,
      descripcion: `ruta ${err.route} método ${err.method} no autorizada`,
    });
  }
};

app.use("/carrito", carritoRouter);
app.use("/productos", productosRouter);
app.use(errorHandler);

export default app;
