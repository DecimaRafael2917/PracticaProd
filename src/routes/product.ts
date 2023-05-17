import { Router } from 'express';
import { createProduct, deleteProduct } from '../controllers/product';

export const router = Router();

router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
// params /products/:id