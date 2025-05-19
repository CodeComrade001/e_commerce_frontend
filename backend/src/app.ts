import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRoute from './features/product/product.routes.js';
import userAuthRoute from './features/user-auth/user-auth.routes.js';
import userRoute from './features/user/user.routes.js';
import adminProductRouter from './features/admin/products/products.route.js';
import UserOrderRoute from './features/order/order.routes.js';
import OrderAnalyticsRoute from './features/admin/analytics/order.analytics.route.js';

export default function createApp() {
  const app = express();

  // CORS
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

  // JSON parser
  app.use(express.json());
  app.use(cookieParser());

  // Routes
  app.use('/api/products', productRoute);
  app.use('/api/user-auth', userAuthRoute);
  app.use('/api/user', userRoute);
  app.use('/api/admin/product', adminProductRouter);
  app.use('/api/admin/order', UserOrderRoute);
  app.use('/api/admin/analytics', OrderAnalyticsRoute);

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

