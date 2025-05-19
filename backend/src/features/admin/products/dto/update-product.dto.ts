// src/features/admin/products/dto/update-product.dto.ts
import Joi from 'joi';

export const UpdateProductDto = Joi.object({
  title:       Joi.string().min(1).max(255),
  price:       Joi.number().precision(2).min(0),
  description: Joi.string().allow('').max(1000),
  category:    Joi.string().min(1).max(100),
  image_url:   Joi.string().uri().allow(null, ''),
  discount:    Joi.number().integer().min(0).max(100),
}).min(1);
