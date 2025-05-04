import Joi from 'joi';                                  // ⇐ pull in the CJS module

export const userIdDto = Joi.object({
  userId: Joi.number().integer().positive().required(),
})