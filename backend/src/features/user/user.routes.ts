// src/features/user/user.routes.ts
import { Router } from 'express';
import { Login, SignUp } from './user.controller.js';

const userAuthRoute = Router();

// POST /api/user/login
userAuthRoute.post('/login', Login);

// POST /api/user/sign-up
userAuthRoute.post('/sign-up', SignUp);

export default userAuthRoute;
