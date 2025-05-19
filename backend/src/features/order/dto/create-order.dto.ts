import Joi from 'joi';
import { ProductDetails } from '../order.types.js';

export const CreateOrderDto = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  complete_order: Joi.boolean().default(false),
  canceled_order: Joi.boolean().default(false),
  orders_at: Joi.date().iso().required(),
  product_details: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().precision(2).positive().required(),
      })
    )
    .min(1)
    .required(),
});