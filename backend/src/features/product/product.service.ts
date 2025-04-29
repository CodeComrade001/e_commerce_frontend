// src/features/product/product.service.ts
import axios, { AxiosError } from 'axios';
import pool from '../../config/db.js';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


export async function fetchProductDetails(): Promise<Product[]> {
  try {
    // Use pool.query directly for a single SQL statement
    const queryText = `
      SELECT
        id,
        title,
        price,
        description,
        category,
        image_url,
        created_at
      FROM products
      ORDER BY id
      LIMIT 20;
    `;  // ORDER BY goes before LIMIT :contentReference[oaicite:0]{index=0}

    const { rows } = await pool.query<Product>(queryText);
    return rows;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching products:', error.response?.status, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export async function fetchUploadedProduct() {
  // select all products marked as uploaded
  try {

    const { rows } = await pool.query<Product>(
      `SELECT  category,
  ARRAY_AGG(
    JSON_BUILD_OBJECT(
      'id',           id,
      'title',        title,
      'price',        price,
      'description',  description,
      'image_url',    image_url
    )
    ORDER BY id       -- optional: order items within each array
  ) AS products
FROM products
WHERE uploaded = TRUE
GROUP BY category;
`
    );
    return rows;
  } catch (error) {
    console.log(` error in fetchUploadedProduct() ${error} `)
  }
}

export async function fetchHomeProduct() {
  // for example: show the 10 most recent products for home
  try {

    const { rows } = await pool.query<Product>(
      `SELECT id, title, price, description, category, image_url, rating_rate
       FROM products
       ORDER BY id ASC
       LIMIT 10;`
    );
    return rows;
  } catch (error) {
    console.log(` error in fetchHomeProduct() ${error} `)
  }
}