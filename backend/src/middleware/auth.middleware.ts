// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import pool from '../config/db.js';
import { TextEncoder } from 'util';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("🚀 ~ authMiddleware ~ authMiddleware is running")
  console.log("🚀 ~ authMiddleware ~ authMiddleware:", authMiddleware)
  const token = req.cookies['SESSION'];
  console.log("🚀 ~ authMiddleware ~ token:", token)
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const { payload } = await jwtVerify(token, SECRET);
    console.log("🚀 ~ authMiddleware ~ payload:", payload)
    const sid = payload.sid as number;
    console.log("🚀 ~ authMiddleware ~ sid:", sid)
    const { rows } = await pool.query(
      `SELECT user_id FROM sessions WHERE id=$1 AND token=$2`,
      [sid, token]
    );
    if (rows.length === 0) throw new Error('Session invalid');
    // Attach userId for controllers
    (req as any).userId = rows[0].user_id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' });
  }
}
