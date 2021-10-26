import * as path from "path";
const sqliteOptions = {
  client: "sqlite3",
  connection: {
    filename: path.resolve("../db", "ecommerceEntrega.sqlite"),
  },
  useNullAsDefault: true,
};

export default sqliteOptions;
