// src/features/admin/products/dto/create-product.dto.ts
import Joi from 'joi';

export const CreateProductDto = Joi.object({
  title:       Joi.string().min(1).max(255).required(),
  price:       Joi.number().precision(2).min(0).required(),
  description: Joi.string().allow('').max(1000).required(),
  category:    Joi.string().min(1).max(100).required(),
  image_url:   Joi.string().uri().allow(null, ''),
  discount:    Joi.number().integer().min(0).max(100).required(),
});
