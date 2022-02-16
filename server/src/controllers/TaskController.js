const service = require('../services/TaskService');

const create = async (req, res, next) => {
  try {
    const task = req.body;
    await service.create(task);

    return res.status(201).json({ message: 'Task created' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create,
};
