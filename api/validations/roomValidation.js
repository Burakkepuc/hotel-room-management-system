import Joi from 'joi';

export const createRoomValidation = (data) => {
  const schema = Joi.object({
    number: Joi.number().integer().min(1).required(),
    type: Joi.string().valid('Basic', 'Premium', 'Suite').required(),
    price: Joi.number().min(0).required(),
    quantity: Joi.number().integer().min(1).required(),
    isAvailable: Joi.boolean().required(),
  });
  return schema.validate(data);
};

export const updateRoomValidation = (data) => {
  const schema = Joi.object({
    number: Joi.number().integer().min(1).optional(),
    type: Joi.string().valid('Basic', 'Premium', 'Suite').optional(),
    price: Joi.number().min(0).optional(),
    quantity: Joi.number().integer().min(1).optional(),
    isAvailable: Joi.boolean().optional(),
  });
  return schema.validate(data);
};
