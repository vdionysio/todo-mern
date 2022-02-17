const Joi = require('joi-oid');

module.exports = Joi.object({
  name: Joi.string().min(6),
  description: Joi.string(),
  status: Joi.string().valid('open', 'closed'),
  userId: Joi.objectId(),
});
