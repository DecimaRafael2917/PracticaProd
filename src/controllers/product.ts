import { Request, Response } from "express";
import { Product } from "../entities/product";
import { randomUUID } from "crypto";

const products : Product[] = [];

export const createProduct = (req: Request, res: Response) => {

    // const id = req.params.id;

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