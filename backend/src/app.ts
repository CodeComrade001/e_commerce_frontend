import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRoute from './features/product/product.routes.js';
import userAuthRoute from './features/user-auth/user-auth.routes.js';
import userRoute from './features/user/user.routes.js';
import adminProductRouter from './features/admin/products/products.route.js';
import UserOrderRoute from './features/order/order.routes.js';
import OrderAnalyticsRoute from './features/admin/analytics/order.analytics.route.js';
import { HTTPS } from 'express-sslify';
import { limitPayload } from './middleware/limitPayload.js';
import bodyParser from 'body-parser';
import helmet from "helmet";
import createCsurf from './utils/csurf-file.js';
import * as hpp from 'hpp';

export default function createApp() {
  const app = express();

  // If behind a proxy (e.g. Heroku, nginx), trust X-Forwarded-* headers
  // app.set('trust proxy', true);

  // Enforce HTTPS if you want every incoming request to be redirected to HTTPS
  // (or use express-sslify only in production)
  // app.use(HTTPS({ trustProtoHeader: true }));
  // or your own enforcer:
  // app.use(enforceHTTPS);

  // CORS
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

  // Basic security headers
  // app.use(helmet());

  // Prevent HTTP Parameter Pollution
  // app.use(hpp())


  // Body parsers
  app.use(express.json({ limit: '1mb' }));        // JSON bodies
  app.use(bodyParser.urlencoded({ extended: false })); // urlencoded bodies

  // Cookie parser (needed for CSRF tokens in cookies)
  app.use(cookieParser());

  // Limit raw payload size if you want extra protection
  app.use(limitPayload(1_000_000));

  // CSRF protection (apply after cookieParser & bodyParser)
  // const csrfProtection = createCsurf({ cookie: true });
  // app.use(csrfProtection);
  // // app.use(enforceHTTPS)

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

