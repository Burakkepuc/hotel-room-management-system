import Joi from 'joi';

export const createRoomValidation = (data) => {
  const schema = Joi.object({
    number: Joi.string().required(),
    type: Joi.string().valid('basic', 'premium', 'suite').required(),
    price: Joi.number().min(0).required(),
    quantity: Joi.number().integer().min(1).required(),
    isAvailable: Joi.boolean().optional(),
    availableDates: Joi.array().items(
      Joi.object({
        start: Joi.date().required(),
        end: Joi.date().required().greater(Joi.ref('start'))
      })
    ).optional()
  });
  return schema.validate(data);
};

export const updateRoomValidation = (data) => {
  const schema = Joi.object({
    number: Joi.string().optional(),
    type: Joi.string().valid('basic', 'premium', 'suite').insensitive().optional(),
    price: Joi.number().min(0).optional(),
    quantity: Joi.number().integer().min(1).optional(),
    isAvailable: Joi.boolean().optional(),
    availableDates: Joi.array().items(
      Joi.object({
        start: Joi.date().required(),
        end: Joi.date().required().greater(Joi.ref('start'))
      })
    ).optional()
  });
  return schema.validate(data);
};
