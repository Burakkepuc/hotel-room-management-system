import Joi from 'joi';

export const createBookingValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    roomId: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required().greater(Joi.ref('startDate')),
  });
  return schema.validate(data);
};

export const updateBookingValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    roomId: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required().greater(Joi.ref('startDate')),
  });
  return schema.validate(data);
};
