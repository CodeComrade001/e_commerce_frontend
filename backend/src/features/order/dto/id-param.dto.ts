import Joi from 'joi';

export const IdParamDto = Joi.object({
  id: Joi.number().integer().positive().required(),
});
