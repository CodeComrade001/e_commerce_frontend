import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import productRoute from './features/product/product.routes.js';
import userAuthRoute from './features/user/user.routes.js';

export default function createApp() {
  const app = express();

  // CORS
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // JSON parser
  app.use(express.json());

  // Routes
  app.use('/api/products', productRoute);
  app.use('/api/user-auth', userAuthRoute);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  // Global error handler
  // Error handler – explicitly typed
  const errorHandler: ErrorRequestHandler = (
    err: Error,          // any JS Error subclass
    req: Request,        // Express Request object
    res: Response,       // Express Response object
    next: NextFunction   // Express NextFunction callback
  ) => {
    console.error(err);
    res.status((err as any).status || 500).json({ message: err.message });
  };

  return app;
}

