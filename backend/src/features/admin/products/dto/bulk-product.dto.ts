// src/features/admin/products/dto/bulk-product.dto.ts
import Joi from 'joi';
import { UpdateProductDto } from './update-product.dto.js';
import { CreateProductDto } from './create-product.dto.js';

export const BulkCreateDto = Joi.array()
  .items(CreateProductDto)
  .min(1)
  .required();

export const BulkUpdateDto = Joi.array()
  .items(
    Joi.object({
      id:   Joi.number().integer().positive().required(),
      data: UpdateProductDto.required(),
    })
  )
  .min(1)
  .required();
