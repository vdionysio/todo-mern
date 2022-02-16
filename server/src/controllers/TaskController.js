const service = require('../services/TaskService');

const create = async (req, res, next) => {
  try {
    const task = req.body;
    const { email } = req.user;
    console.log(email);
    await service.create(task, email);

    return res.status(201).json({ message: 'Task created' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create,
};
