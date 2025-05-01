// backend/src/features/session/session.service.ts
import { SignJWT, jwtVerify } from 'jose';
import { TextEncoder } from 'util';
import pool from '../../config/db.js';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const TTL_SEC = 24 * 60 * 60; // 24h

export async function createSession(userId: number) {
  try {
    const expiresAt = new Date(Date.now() + TTL_SEC * 1000);
    const { rows } = await pool.query<{ id: number }>(
      `INSERT INTO sessions (user_id, token, expires_at)
     VALUES ($1, '', $2)
     RETURNING id`,
      [userId, expiresAt]
    );
    const sid = rows[0].id;

    const token = await new SignJWT({ sid })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${TTL_SEC}s`)
      .sign(SECRET);

    await pool.query(
      `UPDATE sessions SET token=$1 WHERE id=$2`,
      [token, sid]
    );

    return { token, expiresAt };
  } catch (error: unknown) {
    console.log("🚀 ~ createSession ~ error:", error)
    return null
  }
}

/**
 * Find any session for this user, delete it if expired,
 * and return { token, expiresAt } or null.
 */
export async function validateSession(userId: number): Promise<{ token: string; expiresAt: Date } | null> {
  try {
    // 1) Grab the most recent session row for this user
    const res = await pool.query<{
      id: number;
      token: string;
      expires_at: string;
    }>(
      `SELECT id, token, expires_at
     FROM sessions
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT 1`,
      [userId]
    );

    if (res.rows.length === 0) {
      // no existing session
      return null;
    }

    const { id, token, expires_at } = res.rows[0];
    const expDate = new Date(expires_at);
    if (expDate < new Date()) {
      // expired → clean up that row
      await pool.query(`DELETE FROM sessions WHERE id=$1`, [id]);
      return null;
    }

    // still valid
    return { token, expiresAt: expDate };
  } catch (error: unknown) {
    console.log("🚀 ~ createSession ~ error:", error)
    return null;
  }
}

// src/features/session/decodeSession.ts

/**
 * Given a JWT string, verify it and return the payload.
 */
export async function decodeSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    // payload.sid is your session ID; map that to the user if needed
    const sid = payload.sid as number;
    console.log("🚀 ~ decodeSession ~ sid:", sid)
    return { valid: true, sid, payload };
  } catch (err) {
    // invalid signature or expired
    return { valid: false, error: err };
  }
}
