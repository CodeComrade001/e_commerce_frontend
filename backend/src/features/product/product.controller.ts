// src/features/product/product.controller.ts
import { Request, Response } from 'express';
import { fetchHomeProduct, fetchNewDataset, fetchProductDetails, fetchRootProduct, fetchUploadedProduct } from './product.service.js';


export async function getNewDataset(req: Request, res: Response) {
  try {
    const products = await fetchNewDataset();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching product data \n ${error}` });
  }
}

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
    res.status(500).json({ message: `Error fetching product data \n ${error}` });
  }
}

export async function getLandingPageProduct(req: Request, res: Response) {
  try {
    const products = await fetchRootProduct();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching product data \n ${error}` });
  }
}