import app from "./server";
import dbConnection from "./models/persistence/dbConnection";
ACTIVE_PERSISTENCE = 4;
const PORT = process.env.PORT || 8080;
const db = new dbConnection(process.env.ACTIVE_PERSISTENCE);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  db.instance
    .inicializateSchemas()
    .then((response) => console.log(response))
    .catch((err) => console.log(err.message));
});
server.on("error", (error) => console.log("Error en servidor", error));

export default db.instance;
