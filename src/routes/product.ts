import { Router } from 'express';
import { createProduct } from '../controllers/product';

export const router = Router();

router.get('/products', createProduct);