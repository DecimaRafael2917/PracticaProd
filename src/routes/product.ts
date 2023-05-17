import { Router } from 'express';
import { createProduct, deleteProduct, getProductById } from '../controllers/product';

export const router = Router();

router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:id', getProductById );
// params /products/:id