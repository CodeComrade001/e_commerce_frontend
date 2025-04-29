// src/index.ts
import dotenv from 'dotenv';
import pool from './config/db.js';
import createApp from './app.js';

dotenv.config();                 


// 1. Graceful shutdown handler
async function shutdown(signal: string) {
  try {
    console.log(`\n🛑 Received ${signal}. Closing DB connection…`);
    // If using pg.Pool:
    await pool.end();                       // closes all clients in the pool

    // If you were using MongoClient:
    // await client.close();

    console.log('✅ DB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
}

// 2. Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// 3. Catch unhandled errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown('uncaughtException');
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  shutdown('unhandledRejection');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

async function bootstrap() {
  try {
    await pool.connect();
    console.log('✅ DB connected');
  } catch (err) {
    console.error('❌ Failed DB connection:', err);
    process.exit(1);
  }

  const app = createApp();
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () =>
    console.log(`🚀 Server running on http://localhost:${port}`)
  );
}

bootstrap();
