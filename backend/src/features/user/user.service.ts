// src/features/user/user.service.ts
import bcrypt from 'bcrypt';
import pool from '../../config/db.js';

interface NewUser {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface CreateAccountPromise {
  result: boolean,
  userId: number
}

interface LogInPromise {
  result: boolean,
  userId: number
}

/**
 * Creates a new user account: hashes the password and inserts into DB.
 */
export async function CreateNewAccount(newUser: NewUser): Promise<CreateAccountPromise> {
  try {
    const { name, email, password } = newUser;
    // 1. Hash the plain-text password with a salt
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);  // citehttps://www.npmjs.com/package/bcrypt

    // 2. Insert into users table
    const insertSql = `
    INSERT INTO users (name, email, password, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id;
  `;
    const { rows } = await pool.query<User>(insertSql, [name, email, hashed]);  // citehttps://node-postgres.com/features/queries

    return { result: true, userId: rows[0].id }
  } catch (err) {
    // (Optional) console.error(err);
    return { result: false, userId: 0 };
  }
}

/**
 * Logs in an existing user: verifies email exists and password matches.
 */
export async function LogInExistingAccount(
  email: string,
  plainPassword: string
): Promise<LogInPromise> {
  try {
    // 1. Fetch the stored hash + id for this email
    const selectSql = `
   SELECT id, password
   FROM users
   WHERE email = $1
 `;
    const result = await pool.query<{ id: number; password: string }>(
      selectSql,
      [email]
    );

    if (result.rows.length === 0) {
      // no such user
      return { result: false, userId: 0 };
    }
    const { id, password: hashed } = result.rows[0];

    // 2. Compare provided password to stored hash
    const match = await bcrypt.compare(plainPassword, hashed);
    if (!match) {
      return { result: false, userId: 0 };
    }

    // 3. Success!
    return { result: true, userId: id };
  } catch (err) {
    // (Optional) console.error(err);
    return { result: false, userId: 0 };
  }
}
