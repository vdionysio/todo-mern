const Joi = require('joi-oid');

module.exports = Joi.object({
  name: Joi.string().min(6).required(),
  description: Joi.string(),
  status: Joi.string().valid('open', 'closed').required(),
  userId: Joi.objectId(),
});
