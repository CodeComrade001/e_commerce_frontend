// src/features/user/user.service.ts
import bcrypt from 'bcrypt';
import pool from '../../config/db.js';

interface NewUser { name: string; email: string; password: string; }
interface User { id: number; name: string; email: string; created_at: string; }

interface CreateAccountPromise {
  result: boolean;
  userId: number;
}

interface LogInPromise {
  result: boolean;
  userId: number;
  avatar: string;
}

/** unchanged **/
export async function CreateNewAccount(newUser: NewUser): Promise<CreateAccountPromise> {
  try {
    const { name, email, password } = newUser;
    const hashed = await bcrypt.hash(password, 10);
    const insertSql = `
      INSERT INTO users (name, email, password, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id;
    `;
    const { rows } = await pool.query<User>(insertSql, [name, email, hashed]);
    // Note: session creation happens in controller, not here
    return { result: true, userId: rows[0].id };
  } catch (error: unknown) {
    console.log("🚀 ~ CreateNewAccount ~ error:", error)
    return { result: false, userId: 0 };
  }
}

/**
 * Logs in an existing user: verifies credentials,
 * then either reuses a valid session or creates a new one.
 */
export async function LogInExistingAccount(
  email: string,
  plainPassword: string
): Promise<LogInPromise> {
  try {
    // 1. Fetch hash + id
    const selectSql = `
      SELECT id, password,avatar_url
      FROM users WHERE email = $1
    `;
    const result = await pool.query<{ id: number; password: string , avatar_url : string }>(
      selectSql,
      [email]
    );

    if (result.rows.length === 0) {
      return { result: false, userId: 0, avatar : "" };
    }
    const { id, password: hashed, avatar_url } = result.rows[0];

    // 2. Verify password
    const match = await bcrypt.compare(plainPassword, hashed);
    if (!match) {
      return { result: false, userId: 0, avatar : ''  };
    }
    return { result: true, userId: id, avatar: avatar_url };
  } catch (error: unknown) {
    console.log("🚀 ~ error:", error)
    return { result: false, userId: 0, avatar : '' };
  }
}
