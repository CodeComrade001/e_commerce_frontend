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

export async function fetchNewDataset() {
  try {
    // 1) Fetch and parse
    const response = await fetch('https://dummyjson.com/products?limit=194');
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }
    const { products } = await response.json();  // destructure products array

    // 2) Prepare SQL (7 columns: title, price, description, category, image_url, discount, created_at)
    const sql = `
      INSERT INTO products
        (title, price, description, category, image_url, discount, created_at)
      VALUES
        ($1,      $2,    $3,          $4,       $5,        $6,       NOW())
      RETURNING id;
    `;

    // 3) Insert in sequence (could also batch with Promise.all)
    for (const item of products) {
      const imageUrl = Array.isArray(item.images) && item.images.length
        ? item.images[0]
        : null;

      const discountInt = Math.round(item.discountPercentage);

      const { rowCount, rows } = await pool.query(sql, [
        item.title,
        item.price,
        item.description,
        item.category,
        imageUrl,
        discountInt,
      ]);

      console.log(`Inserted product ${rows[0].id} (success? ${rowCount === 1})`);
    }

    console.log(`✅ All ${products.length} products inserted.`);
  } catch (error: unknown) {
    console.error('Error in fetchNewDataset:', error);
  }
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
    const sql = `SELECT  category,
    ARRAY_AGG(
      JSON_BUILD_OBJECT(
        'id',           id,
        'title',        title,
        'price',        price,
        'description',  description,
        'image_url',    image_url,
        'category', category
      )
      ORDER BY id       -- optional: order items within each array
    ) AS products
  FROM products
  WHERE uploaded = TRUE
  GROUP BY category;
  `
    const { rows } = await pool.query<Product>(sql);
    return rows;
  } catch (error) {
    console.log(` error in fetchUploadedProduct() ${error} `)
  }
}

export async function fetchHomeProduct() {
  // for example: show the 10 most recent products for home
  try {
    const sql = `SELECT id, title, price, description, category, image_url, rating_rate
     FROM products
     ORDER BY id ASC
     LIMIT 10;`

    const { rows } = await pool.query<Product>(sql);
    return rows;
  } catch (error) {
    console.log(` error in fetchHomeProduct() ${error} `)
  }

}

export async function fetchRootProduct() {
  const sql = `
    WITH featured_products AS (
      SELECT
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id',          sub.id,
            'title',       sub.title,
            'price',       sub.price,
            'description', sub.description,
            'image_url',   sub.image_url,
            'discount',   sub.discount
          ) ORDER BY sub.id
        ) AS arr
      FROM (
        SELECT
          p.id,
          p.title,
          p.price,
          p.description,
          p.image_url,
          p.discount,
          ROW_NUMBER() OVER (ORDER BY p.id) AS rn
        FROM landing_page lp
        JOIN products p
          ON lp.product_id = p.id
        WHERE lp.uploaded  = true
          AND lp.featured  = true
      ) AS sub
      WHERE sub.rn <= 5
    ),
    limited_products AS (
      SELECT
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id',          sub.id,
            'title',       sub.title,
            'price',       sub.price,
            'description', sub.description,
            'image_url',   sub.image_url,
            'discount',   sub.discount
          ) ORDER BY sub.id
        ) AS arr
      FROM (
        SELECT
          p.id,
          p.title,
          p.price,
          p.description,
          p.image_url,
          p.discount,
          ROW_NUMBER() OVER (ORDER BY p.id) AS rn
        FROM landing_page lp
        JOIN products p
          ON lp.product_id = p.id
        WHERE lp.uploaded      = true
          AND lp.limited_offer = true
      ) AS sub
      WHERE sub.rn <= 5
    )
    SELECT
      JSON_BUILD_OBJECT(
        'featured', featured_products.arr,
        'limited',  limited_products.arr
      ) AS result
    FROM featured_products
    CROSS JOIN limited_products;
  `;

  try {
    const { rows } = await pool.query<{ result: { featured: any[]; limited: any[] } }>(sql);
    return rows[0]?.result ?? { featured: [], limited: [] };
  } catch (error) {
    console.error("Error in fetchRootProduct():", error);
    throw error;
  }
}