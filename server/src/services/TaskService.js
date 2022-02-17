const Task = require('../models/Task');
const User = require('../models/User');
const TaskSchema = require('../schemas/taskSchema');
const { validateError } = require('../helpers');

const create = async (input, email) => {
  const user = await User.findOne({ email });

  if (!user) throw validateError(400, '"userId" must be valid');

  const { error } = TaskSchema.validate({ ...input, userId: user._id });

  if (error) throw validateError(400, error.message);

  const newTask = new Task({ ...input, userId: user._id });

  try {
    await newTask.save();
    return true;
  } catch (err) {
    throw validateError(409, err.message);
  }
};

const getAll = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw validateError(400, '"userId" must be valid');

  const tasks = await Task.find({ userId: user._id });

  return tasks;
};

module.exports = {
  create,
  getAll,
};
