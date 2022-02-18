const service = require('../services/TaskService');
const rescue = require('express-rescue');

const create = rescue(async (req, res, _next) => {
  const input = req.body;
  const { email } = req.user;
  const task = await service.create(input, email);

  return res.status(201).json({ task });
});

const getAll = async (req, res, next) => {
  try {
    const { email } = req.user;

    const tasks = await service.getAll(email);

    return res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const task = req.body;
    const { email } = req.user;
    const { id } = req.params;
    const editedTask = await service.edit(task, email, id);

    return res.status(201).json({ task: editedTask });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    await service.remove(email, id);

    return res.status(201).json({ message: 'your task has been removed' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  edit,
  remove,
};
