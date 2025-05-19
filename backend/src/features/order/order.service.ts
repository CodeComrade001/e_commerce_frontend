
// ============================
// Service: src/features/admin/order/order.service.ts
import pool from '../../config/db.js';
import { Order, OrderCategoryGroup, OrderProduct, ProductDetails } from './order.types.js';


export async function getAllOrders(): Promise<OrderCategoryGroup[]> {
  const query = {
    name: 'fetch-all-orders-grouped',
    text: `
      SELECT
        o.id,
        u.email          AS user_id_gmail,
        o.user_id::text  AS user_id,
        o.ordered_at  AS ordered_at,
        jsonb_agg(
          jsonb_build_object(
            'id',       pd.id,
            'title',    pd.title,
            'price',    pd.price,
            'description', pd.description,
            'category', pd.category,
            'image_url', pd.image_url,
            -- include discount if present
            'discount', pd.discount
          )
          ORDER BY pd.id
        ) AS products
      FROM orders o
      JOIN users u ON u.id = o.user_id
      CROSS JOIN LATERAL
        jsonb_to_recordset(o.product_details) AS pd(
          id          int,
          qty         int,
          price       numeric,
          title       text,
          category    text,
          image_url   text,
          description text,
          discount    numeric
          )
          WHERE o.complete_order = false AND o.canceled_order = false
      GROUP BY o.id, u.email, o.user_id, o.ordered_at
      ORDER BY o.ordered_at DESC;
    `,
  };

  const { rows } = await pool.query<{
    id: number;
    user_id_gmail: string;
    user_id: string;
    ordered_at: string;
    products: OrderProduct[];
  }>(query);

  // Cast directly to our interface
  return rows.map(r => ({
    id: r.id,
    user_id_gmail: r.user_id_gmail,
    user_id: r.user_id,
    ordered_at: r.ordered_at,
    products: r.products,
  }));
}

export async function getOrderById(id: number): Promise<Order | null> {
  const query = {
    name: 'fetch-order-by-id',
    text: 'SELECT * FROM orders WHERE id = $1',
    values: [id],
  };
  const { rows } = await pool.query<Order>(query);
  return rows[0] ?? null;
}

export async function getOrdersByDateRange(
  from: string,
  to: string
): Promise<Order[]> {
  const query = {
    name: 'fetch-orders-by-date',
    text: 'SELECT * FROM orders WHERE orders_at BETWEEN $1 AND $2 ORDER BY orders_at DESC',
    values: [from, to],
  };
  const { rows } = await pool.query<Order>(query);
  return rows;
}

export async function createOrder(
  user_id: number,
  complete_order: boolean,
  canceled_order: boolean,
  orders_at: Date,
  product_details: ProductDetails[]
): Promise<Order> {
  const query = {
    name: 'create-order',
    text: `INSERT INTO orders (user_id, complete_order, canceled_order, orders_at, product_details)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *`,
    values: [user_id, complete_order, canceled_order, orders_at, product_details],
  };
  const { rows } = await pool.query<Order>(query);
  return rows[0];
}

export async function updateOrder(
  id: number,
  data: Partial<Omit<Order, 'id'>>
): Promise<Order | null> {
  const sets: string[] = [];
  const values: any[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(data)) {
    sets.push(`${key} = $${idx}`);
    values.push(value);
    idx++;
  }

  if (!sets.length) return getOrderById(id);

  const query = {
    name: 'update-order',
    text: `UPDATE orders SET ${sets.join(', ')} WHERE id = $${idx} RETURNING *`,
    values: [...values, id],
  };

  const { rows } = await pool.query<Order>(query);
  return rows[0] ?? null;
}

export async function deleteOrder(id: number): Promise<boolean> {
  const query = {
    name: 'delete-order',
    text: 'DELETE FROM orders WHERE id = $1',
    values: [id],
  };
  const { rowCount } = await pool.query(query);
  return rowCount === 1;
}

export async function deleteOrdersBulk(ids: number[]): Promise<number> {
  const query = {
    name: 'delete-orders-bulk',
    text: 'DELETE FROM orders WHERE id = ANY($1)',
    values: [ids],
  };
  const { rowCount } = await pool.query(query);
  return rowCount ?? 0;
}

export async function completeOrder(id: number): Promise<boolean> {
  console.log("🚀 ~ completeOrder ~ id:", id)
  const query = {
    name: 'delete-orders-bulk',
    text: 'UPDATE orders SET complete_order = true WHERE id = $1',
    values: [id],
  };
  const { rowCount } = await pool.query(query);

  return rowCount == null ? false : true;
}

export async function cancelOrder(id: number): Promise<boolean> {
  const query = {
    name: 'delete-orders-bulk',
    text: 'UPDATE orders SET canceled_order = true WHERE id = $1',
    values: [id],
  };
  const { rowCount } = await pool.query(query);

  return rowCount == null ? false : true;
}



