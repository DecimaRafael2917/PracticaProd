import { Request, Response } from "express";
import { Product } from "../entities/product";
import { randomUUID } from "crypto";

const products : Product[] = [];

export const createProduct = (req: Request, res: Response) => {

    // const id = req.params.id;
    const { id } = req.params;

    // receive product from body
    const productNew : Product = req.body;

    console.log("PRODUCT", productNew);

    // validations
    if (productNew.price <= 0) res.status(400).send({message: 'ERROR VALIDATION PRICE'});
    if (productNew.name.length <= 0) res.status(400).send({message: 'ERROR VALIDATION NAME'});
    if (productNew.barcode.length <= 0) res.status(400).send({message: 'ERROR VALIDATION BARCODE'});

    // save
    productNew.id = randomUUID();
    products.push(productNew);

    //response
    res.status(202).send({
        ...productNew
    })
}
export function getProductById(req:Request, res:Response){

    const { id } = req.params;


    const product = products.filter(p =>p.name.toString() === id);
    if (product.length === 0) {
        return res.status(404).send({
            message: `product not exists ${id}`
        }).json();
    } 
    return res.send({
        ...product[0]
    }).json();
}