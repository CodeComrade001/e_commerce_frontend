import dotenv from 'dotenv';
import createApp from './app.js';
import pool from './config/db.js';

dotenv.config();

// 1. Graceful shutdown handler
async function shutdown(signal: string) {
  console.log(`\n🛑 Received ${signal}. Shutting down…`);
  try {
    await pool.end();
    console.log('✅ DB pool closed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error closing DB pool:', err);
    process.exit(1);
  }
}

// 2. Listen for termination signals
process.on('SIGINT',  () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// 3. Catch unhandled errors and rejections (only once each)
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  shutdown('uncaughtException');
});
process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  shutdown('unhandledRejection');
});

async function bootstrap() {
  // No need to call pool.connect() if you're only using pool.query()
  await pool.connect()
  console.log('✅ Ready to accept queries (pool created).');

  const app = createApp();
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () =>
    console.log(`🚀 Server running on http://localhost:${port}`)
  );
}

bootstrap().catch(err => {
  console.error('❌ Bootstrap failed:', err);
  process.exit(1);
});
