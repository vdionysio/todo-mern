const Task = require('../models/Task');
const User = require('../models/User');
const TaskSchema = require('../schemas/taskSchema');
const updateTaskSchema = require('../schemas/updateTaskSchema');
const { validateError, statusDict } = require('../helpers');

const create = async (input, email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw validateError(statusDict.unauthorized, 'Token must be valid');
  }

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

  if (!user) throw validateError(400, 'Token must be valid');

  const tasks = await Task.find({ userId: user._id });

  return tasks;
};

const edit = async (task, email, id) => {
  const user = await User.findOne({ email });
  if (!user) throw validateError(400, 'Token must be valid');

  const { error } = updateTaskSchema.validate(task);
  if (error) throw validateError(400, error.message);

  const updatedTask = await Task.findOneAndUpdate({ _id: id }, { $set: task });
  if (!updatedTask) throw validateError(409, 'Invalid task id');

  return updatedTask;
};

const remove = async (email, id) => {
  const user = await User.findOne({ email });
  if (!user) throw validateError(400, 'Token must be valid');

  const updatedTask = await Task.findByIdAndRemove(id);
  if (!updatedTask) throw validateError(409, 'Invalid task id');
};

module.exports = {
  create,
  getAll,
  edit,
  remove,
};
