import { Producto } from "../models/classModels/Productos.js";
import db from "../app.js";
let admin = true;

export const getProducts = async (req, res) => {
  let { id } = req.params;
  if (id) {
    let productToShow = await db.findById("productos", id);
    return res.json(productToShow);
  } else {
    let products = await db.find("productos");
    return res.json(products);
  }
};

export const addProducts = async (req, res, next) => {
  const { name, description, code, image, price, stock } = req.body;

  if (!admin) {
    next({ route: `${config.hostname}productos`, method: "POST" });
  } else {
    const productToAdd = new Producto(
      name,
      description,
      code,
      image,
      price,
      stock
    );
    let newProduct = await db.create("productos", productToAdd);
    res.json(newProduct);
  }
};

export const updateProduct = async (req, res, next) => {
  let { id } = req.params;
  const { name, description, code, image, price, stock } = req.body;
  let producto = {};
  for (const key in req.body) {
    if (req.body.includes(key)) {
      producto[key] = req.body[key];
    }
  }
  const productToUpdate = await db.update("productos", id, producto);

  if (!admin) {
    next({ route: `${config.hostname}productos`, method: "PUT" });
  } else {
    if (!productToUpdate) {
      res.json({ message: "producto no encontrado" });
    } else {
      (productToUpdate.name = name),
        (productToUpdate.description = description),
        (productToUpdate.code = code),
        (productToUpdate.image = image),
        (productToUpdate.price = price),
        (productToUpdate.stock = stock);
      res.json(productToUpdate);
    }
  }
};

export const deleteProduct = (req, res) => {
  if (!admin) {
    next({ route: `${config.hostname}productos`, method: "PUT" });
  } else {
    let { id } = req.params;
    let productToDelete = await db.delete("productos", id);

    res.json(productToDelete);
  }
};
