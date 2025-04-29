// src/config/db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

  const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function testConnection() {
  const client = await pool.connect();
  try {
    console.log("Database connection established successfully.");
  } catch (error: unknown) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    console.error('Failed to connect to the database:', errorMessage);
  } finally {
    client.release();
  }
}

testConnection();
export default pool;
