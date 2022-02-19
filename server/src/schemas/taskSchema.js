const Joi = require('joi-oid');

module.exports = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('open', 'closed', 'pending').required(),
  userId: Joi.objectId().required(),
});
