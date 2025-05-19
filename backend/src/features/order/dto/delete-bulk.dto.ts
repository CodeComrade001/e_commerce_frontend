import Joi from 'joi';

export const DeleteBulkDto = Joi.object({
  ids: Joi.array().items(Joi.number().integer().positive()).min(1).required(),
});