const Joi = require('joi');

module.exports = Joi.object({
  displayName: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
