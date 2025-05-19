import Joi from 'joi';
import { CreateOrderDto } from './create-order.dto.js';
import { UpdateOrderDto } from './update-order.dto.js';

export const BulkCreateOrderDto = Joi.array()
  .items(CreateOrderDto)
  .min(1)
  .required();

export const BulkUpdateOrderDto = Joi.array()
  .items(
    Joi.object({
      id: Joi.number().integer().positive().required(),
      data: UpdateOrderDto.required(),
    })
  )
  .min(1)
  .required();