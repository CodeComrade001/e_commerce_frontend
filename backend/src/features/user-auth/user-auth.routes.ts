// src/features/user/user.routes.ts
import { Router, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { GetCurrentUser, Login, SignUp } from './user-auth.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const userAuthRoute = Router();

// cast each wrapped handler to RequestHandler
userAuthRoute.post(
  '/login',
  asyncHandler(Login) as RequestHandler
);

userAuthRoute.post(
  '/sign-up',
  asyncHandler(SignUp) as RequestHandler
);

userAuthRoute.get(
  '/me',
  authMiddleware as RequestHandler,      // ← cast directly
  asyncHandler(GetCurrentUser) as RequestHandler
);

export default userAuthRoute;
