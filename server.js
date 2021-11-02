import Express from "express";
import carritoRouter from "./routes/carrito.routes.js";
import productosRouter from "./routes/productos.routes.js";
import dbConnection from "./models/persistence/dbConnection.js";

const app = Express();
let activePersistence = 4;
const PORT = 8080;
const db = new dbConnection(activePersistence);

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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  db.instance
    .inicializateSchemas()
    .then((response) => console.log(response))
    .catch((err) => console.log(err.message));
});

export default db.instance;
