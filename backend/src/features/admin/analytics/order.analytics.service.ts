// src/features/admin/order/order.analytics.service.ts

import pool from "../../../config/db.js";


/**
 * 1. Monthly bar‐chart data: total orders per calendar month.
 *    Returns [{ month: '2025-01', count: 42 }, …]
 */
export async function getMonthlyOrderCounts(): Promise<{ month: string; count: number }[]> {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1);
  const endDate = new Date(now.getFullYear(), now.getMonth(), 1);

  const query = {
    name: 'analytics-monthly-order-counts',
    text: `
      WITH months AS (
        SELECT generate_series(
          date_trunc('month', $1::date),
          date_trunc('month', $2::date),
          interval '1 month'
        ) AS month_start
      )
      SELECT
        to_char(m.month_start, 'YYYY-MM') AS month,
        COALESCE(o.count, 0)             AS count
      FROM months m
      LEFT JOIN (
        SELECT
          date_trunc('month', ordered_at) AS month_start,
          COUNT(*)                         AS count
        FROM orders
        WHERE ordered_at >= $1::date
          AND ordered_at <  ($2::date + interval '1 month')
        GROUP BY month_start
      ) o ON o.month_start = m.month_start
      ORDER BY m.month_start;
    `,
    values: [
      startDate.toISOString().slice(0, 10),
      endDate.toISOString().slice(0, 10)
    ],
  };

  const { rows } = await pool.query<{ month: string; count: number }>(query);
  return rows;
}


/**
 * 1b. Bar‐chart between arbitrary dates (start → end).
 *     If end is omitted, uses NOW().
 *     Returns [{ period: '2025-05-01', count: 5 }, …]
 */
export async function getOrderCountsInRange(
  startDate: string,
  endDate?: string
): Promise<{ period: string; count: number }[]> {
  const end = endDate ?? new Date().toISOString();
  const query = {
    name: 'analytics-range-order-counts',
    text: `
      SELECT
        to_char(ordered_at, 'YYYY-MM-DD') AS period,
        COUNT(*) AS count
      FROM orders
      WHERE ordered_at BETWEEN $1::timestamptz AND $2::timestamptz
      GROUP BY period
      ORDER BY period;
    `,
    values: [startDate, end],
  };
  const { rows } = await pool.query<{ period: string; count: number }>(query);
  return rows;
}

/**
 * 2. Weekly sales % increase/decrease.
 *    Splits out orders that did/didn't use a discount.
 *    Returns {
 *      currentWeek: number;
 *      previousWeek: number;
 *      pctChange: number | null;
 *      discountUsed: number;
 *      noDiscount: number;
 *    }
 */
export async function getWeeklySalesChange(): Promise<{
  currentWeek: number;
  previousWeek: number;
  pctChange: number | null;
}> {
  const query = {
    name: 'analytics-weekly-sales-change',
    text: `
      WITH weekly AS (
        SELECT
          date_trunc('week', ordered_at) AS week_start,
          COUNT(*) AS total_orders
        FROM orders
        GROUP BY week_start
        ORDER BY week_start DESC
        LIMIT 2
      )
      SELECT
        w1.total_orders   AS currentweek,
        w2.total_orders   AS previousweek,
        CASE
          WHEN w2.total_orders = 0 THEN NULL
          ELSE ROUND(
            (
              (w1.total_orders::decimal)
              - (w2.total_orders)
            ) / w2.total_orders * 100,
            2
          )
        END               AS pctchange
      FROM (
        SELECT * FROM weekly LIMIT 1
      ) w1,
      (
        SELECT * FROM weekly OFFSET 1 LIMIT 1
      ) w2;
    `,
  };

  const { rows } = await pool.query<{
    currentweek: number;
    previousweek: number;
    pctchange: number | null;
  }>(query);

  const r = rows[0];
  return {
    currentWeek: r.currentweek,
    previousWeek: r.previousweek,
    pctChange: r.pctchange,
  };
}


/**
 * 3. Line chart versions (same data as #1 & #2)
 */
export const getMonthlyOrderCountsLine = getMonthlyOrderCounts;
export const getWeeklySalesChangeLine = getWeeklySalesChange;

/**
 * 6. Customer purchase summary: email, avatar_url, total spent, total discount used.
 *    Returns [{ email, avatar_url, totalSpent, totalDiscount }, …]
 */
export async function getCustomerPurchaseSummary(): Promise<
  { email: string; avatar_url: string; totalSpent: number; totalDiscount: number }[]
> {
  const query = {
    name: 'analytics-customer-purchase-summary',
    text: `
    SELECT
    u.name,
        u.email,
        u.avatar_url,
        SUM((pd->>'price')::numeric * (pd->>'qty')::int)    AS totalspent,
        SUM(((pd->>'discount')::numeric) * (pd->>'qty')::int) AS totaldiscount
      FROM users u
      JOIN orders o ON o.user_id = u.id
      CROSS JOIN LATERAL jsonb_array_elements(o.product_details) AS pd
      GROUP BY u.id, u.email, u.avatar_url, u.name
      ORDER BY totalspent DESC;
    `,
  };
  const { rows } = await pool.query<{
    email: string;
    avatar_url: string;
    totalspent: number;
    totaldiscount: number;
  }>(query);
  return rows.map(r => ({
    email: r.email,
    avatar_url: r.avatar_url,
    totalSpent: Number(r.totalspent),
    totalDiscount: Number(r.totaldiscount),
  }));
}


export async function getWeeklyCompletionStats(): Promise<
  { date: string; completed: number; active: number }[]
> {
  const now = new Date();
  const dayOfWeek = now.getDay();
  // Compute this week's Monday (Sunday=0 → maps to previous Monday)
  const currentMonday = new Date(now);
  currentMonday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));

  // Today’s date (no time component)
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const formatDate = (d: Date): string => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const query = {
    name: 'weekly-completion-current-week',
    text: `
      WITH dates AS (
  SELECT generate_series($1::date, $2::date, '1 day') AS day
),
stats AS (
  SELECT
    date_trunc('day', ordered_at)::date AS day,
    COUNT(*) FILTER (WHERE complete_order = true AND canceled_order = false)  AS completed,  
    COUNT(*) FILTER (WHERE complete_order = false AND canceled_order = false) AS active     
  FROM orders
  WHERE ordered_at >= $1::date
    AND ordered_at <  ($2::date + interval '1 day')
  GROUP BY day
)
SELECT
  to_char(d.day, 'YYYY-MM-DD') AS date,
  COALESCE(s.completed, 0)     AS completed,  
  COALESCE(s.active, 0)        AS active
FROM dates d
LEFT JOIN stats s USING(day)
ORDER BY d.day;
    `,
    values: [
      formatDate(currentMonday),  // correct local-start
      formatDate(today)           // correct local-end
    ],
  };

  const { rows } = await pool.query<{
    date: string;
    completed: number;
    active: number;
  }>(query);
  console.log("🚀 ~ rows:", rows)

  return rows.map(r => ({
    date: r.date ?? new Date().toISOString().slice(0, 10),
    completed: r.completed > 0 ? r.completed : 0,
    active: r.active > 0 ? r.active : 0,
  }));
}

export async function weeklySalesRatio(): Promise<
  { date: string; completed: number; canceled: number }[]
> {
  const now = new Date();
  const dayOfWeek = now.getDay();  // 0=Sun … 6=Sat

  // 1. Compute this week’s Monday (map Sunday→Monday of this week)
  const currentMonday = new Date(now);
  currentMonday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));

  // 2. Today at local midnight
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  // 3. Helper to format YYYY-MM-DD from local date
  const formatDate = (d: Date): string => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const query = {
    name: 'weekly-sales-ratio',
    text: `
      WITH dates AS (
        SELECT generate_series($1::date, $2::date, '1 day') AS day
      ),
      stats AS (
        SELECT
          date_trunc('day', ordered_at)::date AS day,
          COUNT(*) FILTER (WHERE complete_order = true AND canceled_order = false)  AS completed,
          COUNT(*) FILTER (WHERE canceled_order = true AND  complete_order = true) AS canceled
        FROM orders
        WHERE ordered_at >= $1::date
          AND ordered_at <  ($2::date + interval '1 day')
        GROUP BY day
      )
      SELECT
        to_char(d.day, 'YYYY-MM-DD') AS date,
        COALESCE(s.completed, 0)     AS completed,
        COALESCE(s.canceled, 0)      AS canceled
      FROM dates d
      LEFT JOIN stats s USING(day)
      ORDER BY d.day;
    `,
    values: [
      formatDate(currentMonday),  // correct local-start
      formatDate(today)           // correct local-end
    ],
  };

  try {
    const { rows } = await pool.query<{
      date: string;
      completed: number;
      canceled: number;
    }>(query);

    // rows will now have one entry per day—even if 0 orders
    return rows.map(r => ({
      date: r.date,
      completed: r.completed > 0 ? r.completed : 0,
      canceled: r.canceled > 0 ? r.canceled : 0,
    }));
  } catch (err) {
    console.error('weeklySalesRatio error', err);
    throw err;
  }
}

/**
 * 3. Total weekly sales (no coupon filter)
 */
export async function getWeeklySales(): Promise<
  { week: string; totalSales: number }[]
> {
  const query = {
    name: 'analytics-weekly-sales',
    text: `
      SELECT
        to_char(date_trunc('week', ordered_at), 'YYYY-MM-DD') AS week,
        SUM(total_amount) AS totalSales
      FROM orders
      GROUP BY week
      ORDER BY week;
    `,
  }
  const { rows } = await pool.query<{ week: string; totalsales: number }>(query)
  return rows.map(r => ({
    week: r.week,
    totalSales: Number(r.totalsales),
  }))
}

/**
 * 4. Weekly coupon‐only sales
 */
export async function getWeeklyCouponSales(): Promise<
  { week: string; couponSales: number }[]
> {
  const query = {
    name: 'analytics-weekly-coupon-sales',
    text: `
      SELECT
        to_char(date_trunc('week', o.ordered_at), 'YYYY-MM-DD') AS week,
        SUM(
          (pd->>'price')::numeric
          * (pd->>'quantity')::int
          * ((100 - (pd->>'discount')::numeric) / 100)
        ) AS couponSales
      FROM orders o
      CROSS JOIN LATERAL jsonb_array_elements(o.product_details) AS pd
      WHERE (pd->>'discount') IS NOT NULL
      GROUP BY week
      ORDER BY week;
    `,
  }
  const { rows } = await pool.query<{ week: string; couponsales: number }>(
    query
  )
  return rows.map(r => ({
    week: r.week,
    couponSales: Number(r.couponsales),
  }))
}

/**
 * 5. Weekly sales change & discount recommendation
 */
// export async function getWeeklySalesChange(): Promise<{
//   currentWeek: number
//   previousWeek: number
//   pctChange: number | null
//   discountUsed: number
//   noDiscount: number
// }> {
//   const query = {
//     name: 'analytics-weekly-sales-change',
//     text: `
//       WITH sales AS (
//         SELECT
//           date_trunc('week', ordered_at) AS week_start,
//           SUM(total_amount) FILTER (
//             WHERE EXISTS (
//               SELECT 1 FROM jsonb_array_elements(product_details) pd
//               WHERE (pd->>'discount') IS NOT NULL
//             )
//           ) AS discount_used,
//           SUM(total_amount) FILTER (
//             WHERE NOT EXISTS (
//               SELECT 1 FROM jsonb_array_elements(product_details) pd
//               WHERE (pd->>'discount') IS NOT NULL
//             )
//           ) AS no_discount
//         FROM orders
//         GROUP BY week_start
//       ),
//       ranked AS (
//         SELECT
//           week_start,
//           discount_used,
//           no_discount,
//           lag(discount_used) OVER (ORDER BY week_start) AS prev_discount
//         FROM sales
//       )
//       SELECT
//         discount_used AS "currentWeek",
//         COALESCE(prev_discount, 0)    AS "previousWeek",
//         CASE
//           WHEN prev_discount IS NULL OR prev_discount = 0 THEN NULL
//           ELSE ROUND(((discount_used - prev_discount) / prev_discount) * 100, 2)
//         END                           AS "pctChange",
//         discount_used                 AS "discountUsed",
//         no_discount                   AS "noDiscount"
//       FROM ranked
//       ORDER BY week_start DESC
//       LIMIT 1;
//     `,
//   }
//   const { rows } = await pool.query<{
//     currentweek: number
//     previousweek: number
//     pctchange: number | null
//     discountused: number
//     nodiscount: number
//   }>(query)

//   const r = rows[0]
//   return {
//     currentWeek: Number(r.currentweek),
//     previousWeek: Number(r.previousweek),
//     pctChange: r.pctchange,
//     discountUsed: Number(r.discountused),
//     noDiscount: Number(r.nodiscount),
//   }
// }