import knex from "knex";

export default function Sql(options) {
  this.connection = knex(options);

  this.inicializateSchemas = async () => {
    try {
      await this.connection.schema.dropTableIfExists("productos");
      await this.connection.schema.createTable("productos", (table) => {
        table.string("id"),
          table.timestamp("timestamp"),
          table.string("name"),
          table.string("description"),
          table.string("code"),
          table.string("image"),
          table.decimal("price", 8, 2),
          table.integer("stock");
      });
      await this.connection.schema.dropTableIfExists("cart");
      await this.connection.schema.createTable("cart", (table) => {
        table.string("id"), table.json("productos");
      });
      return `tablas inicializadas`;
    } catch (e) {
      await this.connection.destroy();
      throw new Error(error.message);
    }
  };

  this.create = (table, productos) => {
    try {
      await this.connection(table).insert(productos);
      return await this.find(table);
    } catch (e) {
      throw new Error(e);
    }
  };
  this.find = (table) => {
    this.connection.from(table).select("*");
  };
  this.findById = async (table, id) => {
    try {
      let product = await this.connection
        .from(table)
        .select("*")
        .where("id", "=", id);
      return product;
    } catch (e) {
      throw new Error(e);
    }
  };
  this.update = async (table, id, producto) => {
    try {
      let updatedProduct = await this.connection
        .from(table)
        .select("*")
        .where("id", "=", id)
        .update(producto);
      if (updatedProduct) return await this.findById(table, id);
    } catch (e) {
      throw new Error(e);
    }
  };
  this.delete = async (table, id) => {
    try {
      let deletedProduct = await this.connection
        .from(table)
        .select("*")
        .where("id", "=", id)
        .del();
      if (deletedProduct) return "Objeto borrado";
    } catch (e) {
      throw new Error(e);
    }
  };
}
