// src/features/product/product.controller.ts
import { Request, Response } from 'express';
import { fetchHomeProduct, fetchProductDetails, fetchUploadedProduct } from './product.service.js';


export async function getProduct(req: Request, res: Response) {
  try {
    const products = await fetchProductDetails();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching product data \n ${error}` });
  }
}

export async function getUploadedProduct(req: Request, res: Response) {
  try {
    const products = await fetchUploadedProduct();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching product data \n ${error}` });
  }
}

export async function getHomeProduct(req: Request, res: Response) {
  try {
    const products = await fetchHomeProduct();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching product data \n ${error}`  }    );
  }
}