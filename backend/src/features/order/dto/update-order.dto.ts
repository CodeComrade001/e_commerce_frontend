import Joi from 'joi';

export const UpdateOrderDto = Joi.object({
  user_id: Joi.number().integer().positive(),
  complete_order: Joi.boolean(),
  canceled_order: Joi.boolean(),
  orders_at: Joi.date().iso(),
  product_details: Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().precision(2).positive().required(),
    })
  ),
});