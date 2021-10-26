import { dbs } from "./index.js";
import config from "../../configs/mongo.js";
import mySqlOptions from "../../configs/mysql.js";
import sqliteOptions from "../../configs/sqlite.js";

const { Memoria, Mongo, Firebase, Sql } = dbs;

export default function dbConnection(id) {
  this.instance =
    id == 2
      ? new Sql(mySqlOptions)
      : id == 4
      ? new Sql(sqliteOptions)
      : id == 5
      ? new Mongo(config.URI, config.options)
      : id == 6
      ? new Mongo(config.AtlasURI, config.options)
      : id == 7
      ? new Firebase()
      : new Memoria();
}
