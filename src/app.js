import express from "express";
import { ProductManager } from "./ProductManager.js";

//Cremos el servidor junto a sus endpoints.
const host = express();
host.use(express.urlencoded({ extended: true }));

//Traemos todos los productos de ProductManager.
const item = new ProductManager();
const totalProduct = item.scanProducts();

//Endpoints

//Obtenemos la informacion y creamos la ruta "products", con un condicion para limitar los productos, si se cumple la misma se otorga el numero seleccionado, de lo contrario se muestran todos los productos.
host.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);

  if (!limit) return res.send(await totalProduct);
  let allItems = await totalProduct;
  let itemLimit = allItems.slice(0, limit);
  res.send(itemLimit);
});

//Obtenemos la informacion y creamos la ruta "Products/:pid" para mostrar el producto determinado a traves de un numero ID.
host.get("/products/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  let allItems = await totalProduct;
  let itemById = allItems.find((product) => product.id === id);
  res.send(itemById);
});

//Creacion del Puerto 3000 usando las funcionalidades de Express.
const PORT = 3000;

host.get("/", (req, res) => {
  const initialization = `<p> Bienvenidos al port ${PORT} :) </p>`;
  res.send(initialization);
});

host.listen(PORT, () => console.log(`Servidor ${PORT} activado`));
