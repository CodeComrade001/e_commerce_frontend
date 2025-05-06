// src/features/product/product.routes.ts
import { Router } from 'express';
import { getHomeProduct, getNewDataset, getProduct, getUploadedProduct } from './product.controller.js';

const productRoute = Router();

productRoute.get('/',        getProduct);          // GET /api/products
productRoute.get('/admin/uploaded', getUploadedProduct); // GET /api/products/uploaded
productRoute.get('/home',     getHomeProduct);
productRoute.get('/admin/dataset',     getNewDataset);

export default productRoute;