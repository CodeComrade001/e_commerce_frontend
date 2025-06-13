// src/features/admin/products/products.service.ts
import pool from '../../../config/db.js';
import { Product, NewProduct, UpdateProduct } from './product.types.js';

// Allowed columns for dynamic updates
const ALLOWED_UPDATE_COLUMNS = new Set([
  'title',
  'price',
  'description',
  'category',
  'image_url',
  'discount',
  'uploaded',
]);

export async function getAllProductsGroupedByCategory(): Promise<Record<string, Product[]> | null> {
  try {
    const query = {
      name: 'fetch-grouped-products',
      text: `
        SELECT
  category,
  json_agg(p ORDER BY p.id) AS products
FROM products AS p
GROUP BY category
ORDER BY category
LIMIT 30;
      `,
      values: [],
    };
    const { rows } = await pool.query<{
      category: string;
      products: Product[];
    }>(query);

    // Map to Record<category, products[]>
    return rows.reduce((acc, { category, products }) => {
      acc[category] = products;
      return acc;
    }, {} as Record<string, Product[]>);
  } catch (error) {
    console.error('🚀 ~ getAllProductsGroupedByCategory ~ error:', error);
    return null;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const query = {
      name: 'fetch-product-by-id',
      text: `SELECT * FROM products WHERE id = $1`,
      values: [id],
    };
    const { rows } = await pool.query<Product>(query);
    return rows[0] ?? null;
  } catch (error) {
    console.error('🚀 ~ getProductById ~ error:', error);
    return null;
  }
}

export async function createProduct(data: NewProduct): Promise<Product | null> {
  try {
    const { title, price, description, category, image_url, discount } = data;
    const query = {
      name: 'insert-product',
      text: `
        INSERT INTO products
          (title, price, description, category, image_url, discount, created_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING *;
      `,
      values: [title, price, description, category, image_url, discount],
    };
    const { rows } = await pool.query<Product>(query);
    return rows[0] ?? null;
  } catch (error) {
    console.error('🚀 ~ createProduct ~ error:', error);
    return null;
  }
}

export async function createProductsBulk(items: NewProduct[]): Promise<(Product | null)[] | null> {
  try {
    const created: (Product | null)[] = [];
    for (const item of items) {
      created.push(await createProduct(item));
    }
    return created;
  } catch (error) {
    console.error('🚀 ~ createProductsBulk ~ error:', error);
    return null;
  }
}

export async function updateProduct(id: number, data: UpdateProduct): Promise<Product | null> {
  try {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      if (!ALLOWED_UPDATE_COLUMNS.has(key)) continue;
      fields.push(`${key} = $${idx}`);
      values.push(value);
      idx++;
    }

    if (fields.length === 0) {
      // Nothing to update
      return await getProductById(id);
    }

    // add the id as the last parameter
    values.push(id);
    const query = {
      name: 'update-product',
      text: `
        UPDATE products
        SET ${fields.join(', ')}
        WHERE id = $${idx}
        RETURNING *;
      `,
      values,
    };
    const { rows } = await pool.query<Product>(query);
    return rows[0] ?? null;
  } catch (error) {
    console.error('🚀 ~ updateProduct ~ error:', error);
    return null;
  }
}

export async function updateProductsBulk(
  updates: { id: number; data: UpdateProduct }[]
): Promise<(Product | null)[] | null> {
  try {
    const results: (Product | null)[] = [];
    for (const { id, data } of updates) {
      results.push(await updateProduct(id, data));
    }
    return results;
  } catch (error) {
    console.error('🚀 ~ updateProductsBulk ~ error:', error);
    return null;
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const query = {
      name: 'delete-product',
      text: `DELETE FROM products WHERE id = $1`,
      values: [id],
    };
    const { rowCount } = await pool.query(query);
    return rowCount === 1;
  } catch (error) {
    console.error('🚀 ~ deleteProduct ~ error:', error);
    return false;
  }
}

export async function deleteProductsBulk(ids: number[]): Promise<number | null> {
  try {
    const query = {
      name: 'delete-products-bulk',
      text: `DELETE FROM products WHERE id = ANY($1)`,
      values: [ids],
    };
    const { rowCount } = await pool.query(query);
    return rowCount;
  } catch (error) {
    console.error('🚀 ~ deleteProductsBulk ~ error:', error);
    return null;
  }
}
