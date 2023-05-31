import { NextFunction, Request, Response } from "express";
import { Product } from "../entities/product";
import { ProductSchema } from "../db/schemas/product";
import { client } from '../db/connect';

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

    // invoke schema
    const productModel = client.model("Product", ProductSchema);

    // create product in mongodb
    const product = await productModel.create({
      name: productNew.name,
      price: productNew.price,
      barcode: productNew.barcode,
    });

    //response
    res.status(202).send({
      ...productNew,
      id: product.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  // invoke schema
  const productModel = client.model("Product", ProductSchema);

  try {
    await productModel.deleteOne({ _id: productId });
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: (error as any).message });
  }
};

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;

  const productModel = client.model("Product", ProductSchema);

  try {
    const product = await productModel.findById(id);
    return res
      .send({
        id: product?.id,
        name: product?.name,
        price: product?.price,
        barcode: product?.barcode,
      })
      .json();
  } catch (error) {
    return res
      .status(400)
      .send({
        message: `Product not exist id: ${id}`
      })
      .json();
  }


}

export const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {

  // invoke schema
  const productModel = client.model("Product", ProductSchema);
  const productsMongo = await productModel.find();
  const products: Product[] = [];

  productsMongo.map((pm) => {
    products.push({
      id: pm.id,
      name: pm.name,
      price: pm.price,
      barcode: pm.barcode,
    });
  });

  // next()
  return res.send({ products }).json();
};


export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const productUpdated: Product = req.body;

  const productModel = client.model("Product", ProductSchema);

  try {
    const product = await productModel.findById(id);
    await productModel.updateOne({ _id: id }, { $set: { price: productUpdated.price } })
    return res
      .send({
        id: product?.id,
        name: product?.name,
        price: productUpdated?.price,
        barcode: product?.barcode,
      })
      .json();

  } catch (error) {
    return res
      .status(400)
      .send({
        message: `Product not exist id: ${id}`
      })
      .json();
  }

}
