// src/features/user/dto/order.dto.ts
import Joi from 'joi';

const ProductSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  image_url: Joi.string().uri().required(),
  qty: Joi.number().integer().min(1).optional()
});

export const OrderRequestDto = Joi.object({
  userId: Joi.number().integer().positive().required(),
  products: Joi.array().items(ProductSchema).min(1).required()
});
