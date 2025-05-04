import { RequestHandler, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { fetchUserDetails, addOrder, addToWishlist, removeFromWishlist, updateUserDetails, GetPlacedOrder, FetchAllUserWishlist, } from './user.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const userRoute = Router();

// All routes require authentication
userRoute.use(authMiddleware as RequestHandler);

// Fetch user details
userRoute.post(
  '/details',
  asyncHandler(fetchUserDetails)
);

// Orders
userRoute.post(
  '/order',
  asyncHandler(addOrder)
);

userRoute.post(
  '/order/history',
  asyncHandler(GetPlacedOrder)
);

// Wishlist
userRoute.post(
  '/wishlist/all',
  asyncHandler(FetchAllUserWishlist)
);
userRoute.post(
  '/wishlist',
  asyncHandler(addToWishlist)
);
userRoute.delete(
  '/wishlist',
  asyncHandler(removeFromWishlist)
);

// Update profile
userRoute.patch(
  '/',
  asyncHandler(updateUserDetails)
);

export default userRoute;
