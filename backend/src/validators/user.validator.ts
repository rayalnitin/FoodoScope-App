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
