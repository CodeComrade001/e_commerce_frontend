import pool from '../../config/db.js';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  qty?: number;
}

interface PlaceOrderRequest {
  userId: number;
  products: Product[];
}

export async function getUserDetails(userId: number) {
  const sql = `
    SELECT id, name, email, avatar_url, created_at
    FROM users
    WHERE id = $1
  `;
  try {
    const { rows } = await pool.query(sql, [userId]);
    return rows[0] || null;
  } catch (error) {
    console.error('🚀 ~ getUserDetails ~ error:', error);
    return null;
  }
}

export async function placeOrder(dto: PlaceOrderRequest) {
  const { userId, products } = dto;
  const productFormat = products.map(p => ({
    ...p,
    qty: p.qty ?? 1
  }));

  const sql = `
    INSERT INTO orders (user_id, product_details, ordered_at)
    VALUES ($1, $2::jsonb, NOW())
  `;
  try {
    await pool.query(sql, [userId, JSON.stringify(productFormat)]);
  } catch (error) {
    console.error('🚀 ~ placeOrder ~ error:', error);
    throw error; // let caller know insertion failed
  }
}

export async function getUserPlaceOrder(dto: { userId: number }) {
  const { userId } = dto;
  const sql = `
    SELECT
      id            AS order_id,
      product_details,
      ordered_at
    FROM orders
    WHERE user_id = $1
    ORDER BY id
    LIMIT 10
  `;
  try {
    const { rows } = await pool.query(sql, [userId]);
    return rows;
  } catch (error) {
    console.error('🚀 ~ getUserPlaceOrder ~ error:', error);
    return [];
  }
}

export async function removeOrder(userId: number, orderId: number) {
  const sql = `
    DELETE FROM orders
    WHERE id = $1 AND user_id = $2
  `;
  try {
    const result = await pool.query(sql, [orderId, userId]);
    if (result.rowCount === 0) {
      throw new Error('Order not found or unauthorized');
    }
  } catch (error) {
    console.error('🚀 ~ removeOrder ~ error:', error);
    throw error;
  }
}

export async function fetchWishlistOrder(dto: { userId: number }) {
  const { userId } = dto;
  const sql = `
    SELECT
      w.id            AS wishlist_id,
      w.product_id    AS wishlistProductId,
      w.created_at,
      p.id,
      p.title,
      p.price,
      p.description,
      p.category,
      p.image_url
    FROM wishlist AS w
    JOIN products AS p
      ON w.product_id = p.id
    WHERE w.user_id = $1
    ORDER BY p.id
    LIMIT 20;
  `;
  try {
    const { rows } = await pool.query(sql, [userId]);
    return rows;
  } catch (error) {
    console.error('🚀 ~ fetchWishlistOrder ~ error:', error);
    return [];
  }
}

export async function addWishlist(dto: { userId: number; productId: number }) {
  const { userId, productId } = dto;
  const sql = `
    INSERT INTO wishlist (user_id, product_id, created_at)
    VALUES ($1, $2, NOW())
    ON CONFLICT DO NOTHING
  `;
  try {
    await pool.query(sql, [userId, productId]);
  } catch (error) {
    console.error('🚀 ~ addWishlist ~ error:', error);
    throw error;
  }
}

export async function removeWishlist(dto: { userId: number; productId: number }) {
  const { userId, productId } = dto;
  const sql = `
    DELETE FROM wishlist
    WHERE user_id = $1 AND product_id = $2
  `;
  try {
    await pool.query(sql, [userId, productId]);
  } catch (error) {
    console.error('🚀 ~ removeWishlist ~ error:', error);
    throw error;
  }
}

export async function updateUser({
  userId, name, email, avatar_url,
}: { userId: number; name?: string; email?: string; avatar_url?: string }) {
  const fields = [];
  const values: any[] = [];
  let idx = 1;
  if (name) { fields.push(`name = $${idx++}`); values.push(name); }
  if (email) { fields.push(`email = $${idx++}`); values.push(email); }
  if (avatar_url) { fields.push(`avatar_url = $${idx++}`); values.push(avatar_url); }
  if (fields.length === 0) return;

  const sql = `
    UPDATE users SET ${fields.join(', ')}
    WHERE id = $${idx}
  `;
  values.push(userId);

  try {
    await pool.query(sql, values);
  } catch (error) {
    console.error('🚀 ~ updateUser ~ error:', error);
    throw error;
  }
}
