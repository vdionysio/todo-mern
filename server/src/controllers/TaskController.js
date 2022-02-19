const service = require('../services/TaskService');
const rescue = require('express-rescue');
const { statusDict } = require('../helpers');

const create = rescue(async (req, res, _next) => {
  const input = req.body;
  const { email } = req.user;
  const task = await service.create(input, email);

  return res.status(statusDict.created).json({ task });
});

const getAll = rescue(async (req, res, _next) => {
  const { email } = req.user;

  const tasks = await service.getAll(email);

  return res.status(statusDict.ok).json({ tasks });
});

const edit = rescue(async (req, res, _next) => {
  const task = req.body;
  const { id } = req.params;
  const { email } = req.user;

  const editedTask = await service.edit(email, task, id);
  return res.status(statusDict.ok).json({ task: editedTask });
});

const remove = rescue(async (req, res, _next) => {
  const { email } = req.user;
  const { id } = req.params;
  const removedTask = await service.remove(email, id);

  return res.status(statusDict.ok).json({ task: removedTask });
});

module.exports = {
  create,
  getAll,
  edit,
  remove,
};
