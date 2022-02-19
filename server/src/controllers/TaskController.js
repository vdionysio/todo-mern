const service = require('../services/TaskService');
const rescue = require('express-rescue');

const create = rescue(async (req, res, _next) => {
  const input = req.body;
  const { email } = req.user;
  const task = await service.create(input, email);

  return res.status(201).json({ task });
});

const getAll = rescue(async (req, res, _next) => {
  const { email } = req.user;

  const tasks = await service.getAll(email);

  return res.status(200).json({ tasks });
});

const edit = rescue(async (req, res, _next) => {
  const task = req.body;
  const { id } = req.params;
  const { email } = req.user;

  const editedTask = await service.edit(email, task, id);
  return res.status(201).json({ task: editedTask });
});

const remove = rescue(async (req, res, _next) => {
  const { email } = req.user;
  const { id } = req.params;
  await service.remove(email, id);

  return res.status(201).json({ message: 'your task has been removed' });
});

module.exports = {
  create,
  getAll,
  edit,
  remove,
};
