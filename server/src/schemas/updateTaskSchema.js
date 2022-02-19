const Joi = require('joi-oid');

module.exports = Joi.object({
  name: Joi.string().min(),
  description: Joi.string(),
  status: Joi.string().valid('in progress', 'ready', 'pending'),
  userId: Joi.objectId(),
});
