import { Router } from 'express';
import { createProduct, getProductById } from '../controllers/product';


export const router = Router();

router.post('/products', createProduct);
router.get('/products/:id', getProductById );

// params /products/:id