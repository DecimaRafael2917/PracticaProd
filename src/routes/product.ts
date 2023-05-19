import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getAllProduct } from '../controllers/product';

export const router = Router();

router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:id', getProductById);
router.get('/products', getAllProduct);

