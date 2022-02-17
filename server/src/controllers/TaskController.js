const service = require('../services/TaskService');

const create = async (req, res, next) => {
  try {
    const task = req.body;
    const { email } = req.user;
    await service.create(task, email);

    return res.status(201).json({ message: 'Task created' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

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

module.exports = {
  create,
  getAll,
};
