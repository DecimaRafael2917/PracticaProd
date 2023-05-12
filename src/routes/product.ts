import { Router } from 'express';
import { createProduct } from '../controllers/product';


export const router = Router();

router.post('/products', createProduct);
router.get('/products/:id', createProduct );

// params /products/:id