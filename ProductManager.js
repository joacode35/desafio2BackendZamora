import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.patch = "./products.json";
    this.item = [];
  }

  static id = 0;

  //Creamos la funcion y le agregamos sus respectivos parametros.
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;

    const newItem = {
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.item.push(newItem);

    //writeFile permite junto a stringify transformar los objetos a un string
    await fs.writeFile(this.patch, JSON.stringify(this.item));
  };

  scanProducts = async () => {
    let solution = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(solution);
  };

  getProducts = async () => {
    let solutionChange = await this.scanProducts();
    return console.log(solutionChange);
  };

  notFound() {
    console.log("Producto inexistente");
  }

  //Obtenemos el array de objetos y lo filtramos por ID -- Realizo una comprobacion con finder para la validacion ID.
  getProductsById = async (id) => {
    let solutionChange2 = await this.scanProducts();
    let finder = solutionChange2.find((product) => product.id === id);
    if (!finder) {
      this.notFound();
    } else {
      console.dir(finder);
    }
  };

  //Recibimos un producto por id, renovamos y llamamos el id restante, luego generamos un array con esos productos y lo reescribimos en nuestro json asincronicamente con writeFile.
  updateProduct = async ({ id, ...items }) => {
    await this.deleteProduct(id);

    const prodFirst = await this.scanProducts();

    const prodChange = [
      {
        id,
        ...items,
      },
      ...prodFirst,
    ];

    await fs.writeFile(this.patch, JSON.stringify(prodChange));
  };

  //Obtenemos los productos y filtramos por id.
  deleteProduct = async (id) => {
    let solutionChange2 = await this.scanProducts();
    let cutProduct = solutionChange2.filter((product) => product.id != id);

    await fs.writeFile(this.patch, JSON.stringify(cutProduct));
    console.log("Producto Eliminado");
  };
}

const item = new ProductManager();

//Lista de productos
//  item.addProduct("Title1", "Dscrp1", 1000, "thumbnail1", "gfd84539d", 5);
//  item.addProduct("Title2", "Dscrp2", 2000, "thumbnail2", "gfd84239d", 6);
//  item.addProduct("Title3", "Dscrp3", 3000, "thumbnail3", "gfd82339d", 7);

//llamamos a las siguientes funciones:
item.getProducts();

item.getProductsById(3);

item.deleteProduct(2);
