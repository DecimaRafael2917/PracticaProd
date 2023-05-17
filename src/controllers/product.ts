import { Request, Response } from "express";
import { Product } from "../entities/product";
import { randomUUID } from "crypto";

const products: Product[] = [
  { id: "1", name: "coca", price: 123, barcode: [] },
  { id: "2", name: "pepsi", price: 321, barcode: [] },
  { id: "3", name: "sprite", price: 432, barcode: [] }
];

export const createProduct = (req: Request, res: Response) => {
  // const id = req.params.id;

  // receive product from body
  const productNew: Product = req.body;
    // const id = req.params.id;
  const { id } = req.params;

  console.log("PRODUCT", productNew);

  // validations
  if (productNew.price <= 0)
    res.status(400).send({ message: "ERROR VALIDATION PRICE" });
  if (productNew.name.length <= 0)
    res.status(400).send({ message: "ERROR VALIDATION NAME" });
  if (productNew.barcode.length <= 0)
    res.status(400).send({ message: "ERROR VALIDATION BARCODE" });

  // save
  productNew.id = randomUUID();
  products.push(productNew);

  //response
  res.status(202).send({
    ...productNew,
  });
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
    
export function getProductById(req:Request, res:Response){

    const { id } = req.params;


    const product = products.filter(p =>p.id.toString() === id);
    if (product.length === 0) {
        return res.status(404).send({
            message: `product not exists ${id}`
        }).json();
    } 
    return res.send({
        ...product[0]
    }).json();
}
