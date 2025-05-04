// src/features/user/dto/update-user.dto.ts
import Joi from 'joi';                                  // ⇐ pull in the CJS module

export const UpdateUserDto = Joi.object({
  userId: Joi.number().integer().positive().required(),
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  avatar_url: Joi.string().uri().optional(),
});
