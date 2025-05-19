// src/features/admin/products/dto/id-param.dto.ts
import Joi from 'joi';

export const IdParamDto = Joi.object({
  id: Joi.number().integer().positive().required(),
});
