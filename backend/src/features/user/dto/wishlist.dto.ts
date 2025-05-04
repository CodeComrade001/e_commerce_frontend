// src/features/user/dto/wishlist.dto.ts
import Joi from 'joi';                                  // ⇐ pull in the CJS module

export const WishlistDto = Joi.object({
  userId: Joi.number().integer().positive().required(),
  productId: Joi.number().integer().positive().required(),
});
