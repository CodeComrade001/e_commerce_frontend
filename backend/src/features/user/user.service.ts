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
  const { rows } = await pool.query(sql, [userId]);
  return rows[0] || null;
}

export async function placeOrder(dto: PlaceOrderRequest) {
  const { userId, products } = dto
  const test = JSON.stringify(products)
  console.log("🚀 ~ placeOrder ~ test:", test)
  const productFormat = products.map(p => ({
    ...p,
    qty: p.qty ?? 1
  }))
  // console.log("🚀 ~ productDetails:", products)
  console.log("🚀 ~ productFormat ~ productFormat:", productFormat)
  const sql = `
    INSERT INTO orders (user_id, product_details, ordered_at)
    VALUES ($1, $2::jsonb, NOW())
  `;
  await pool.query(sql, [userId, JSON.stringify(productFormat)]);
}

export async function getUserPlaceOrder(dto: { userId: number }) {
  const { userId } = dto;    // <-- extract the integer
  console.log("🚀 ~ getUserPlaceOrder ~ userId:", userId)
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
  const { rows } = await pool.query(sql, [userId]);
  console.log("🚀 ~ getUserPlaceOrder ~ rows:", rows)
  return rows;  // rows is an array of { order_id, product_details, ordered_at }
}

export async function removeOrder(userId: number, orderId: number) {
  const sql = `
    DELETE FROM orders
    WHERE id = $1 AND user_id = $2
  `;
  const result = await pool.query(sql, [orderId, userId]);
  if (result.rowCount === 0) {
    throw new Error('Order not found or unauthorized');
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
  const { rows } = await pool.query(sql, [userId]);
  return rows;
}


export async function addWishlist(dto: { userId: number; productId: number }) {
  const { userId, productId } = dto;
  const sql = `
  INSERT INTO wishlist (user_id, product_id, added_at)
    VALUES ($1, $2, NOW())
    ON CONFLICT DO NOTHING
    `;
  await pool.query(sql, [userId, productId]);
}

export async function removeWishlist(dto: { userId: number; productId: number }) {
  const { userId, productId } = dto;
  const sql = `
    DELETE FROM wishlist
    WHERE user_id = $1 AND product_id = $2
  `;
  await pool.query(sql, [userId, productId]);
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
  await pool.query(sql, values);
}
