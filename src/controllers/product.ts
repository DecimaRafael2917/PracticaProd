import { Request, Response } from "express";
import { Product } from "../entities/product";
import { connectMongo } from "../db/connect";
import { ProductSchema } from "../db/schemas/product";

const products: Product[] = [];

export const createProduct = async (req: Request, res: Response) => {

  // receive product from body
  const productNew: Product = req.body;

  // validations
  if (productNew.price <= 0)
    res.status(400).send({ message: "ERROR VALIDATION PRICE" });
  if (productNew.name.length <= 0)
    res.status(400).send({ message: "ERROR VALIDATION NAME" });
  if (productNew.barcode.length <= 0)
    res.status(400).send({ message: "ERROR VALIDATION BARCODE" });

  try {
    // connect mongo
    const client = await connectMongo();

    // invoke schema
    const productModel = client.model('Product', ProductSchema);

    // create product in mongodb
    const product = await productModel.create({
      name: productNew.name,
      price: productNew.price,
      barcode: productNew.barcode
    })

    //response
    res.status(202).send({
      ...productNew,
      id: product.id
    });
  } catch (error) {
    console.log(error);
  }

};

export const deleteProduct = (req: Request, res: Response) => {
  const productId = req.params.id;

  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) {
    return res.status(404).send({ message: "Product not found" });
  }

  products.splice(index, 1);

  res.status(200).send({ message: "Product deleted successfully" });
};

export function getProductById(req: Request, res: Response) {

  const { id } = req.params;


  const product = products.filter(p => p.id.toString() === id);
  if (product.length === 0) {
    return res.status(404).send({
      message: `product not exists ${id}`
    }).json();
  }
  return res.send({
    ...product[0]
  }).json();
}
