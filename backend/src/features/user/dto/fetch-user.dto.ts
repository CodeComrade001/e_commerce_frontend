// src/features/user/dto/fetch-user.dto.ts
import Joi from 'joi';                                  // ⇐ pull in the CJS module

export const FetchUserDto = Joi.object({
  userId: Joi.number().integer().positive().required(),
});
