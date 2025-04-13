import Joi from "joi";

export const updateProfileSchema = Joi.object({
  name: Joi.string(),
  gender: Joi.string().valid("Male", "Female"),
  age: Joi.number().integer().min(1),
  location: Joi.string(),
  height: Joi.number().positive(),
  weight: Joi.number().positive(),
  goalWeight: Joi.number().positive(),
  goals: Joi.array().items(Joi.string()),
}).min(1);

export const createProfileSchema = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female").required(),
  age: Joi.number().integer().min(1).required(),
  location: Joi.string().required(),
  height: Joi.number().positive().required(),
  weight: Joi.number().positive().required(),
  goalWeight: Joi.number().positive().required(),
  goals: Joi.array().items(Joi.string()).required(),
  isVerified: Joi.boolean().default(false),
});
