const Task = require('../models/Task');
const User = require('../models/User');
const TaskSchema = require('../schemas/taskSchema');
const updateTaskSchema = require('../schemas/updateTaskSchema');
const { validateError, statusDict } = require('../helpers');

const create = async (input, email) => {
  const user = await User.findOne({ email });

  const { error } = TaskSchema.validate({ ...input, userId: user._id });

  if (error) throw validateError(statusDict.badRequest, error.message);

  const newTask = new Task({ ...input, userId: user._id });
  const savedTask = await newTask.save();

  return savedTask;
};

const getAll = async (email) => {
  const user = await User.findOne({ email });
  const tasks = await Task.find({ userId: user._id });

  return tasks;
};

const edit = async (email, task, id) => {
  const { error } = updateTaskSchema.validate(task);
  if (error) throw validateError(400, error.message);

  const user = await User.findOne({ email });
  const foundTask = await Task.findById(id);
  if (!foundTask) throw validateError(statusDict.conflict, 'Invalid task id');

  if (!foundTask.userId.equals(user._id)) {
    throw validateError(statusDict.unauthorized, 'You cannot edit this task');
  }

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id },
    { $set: task },
    { new: true }
  );

  return updatedTask;
};

const remove = async (email, id) => {
  const user = await User.findOne({ email });
  const foundTask = await Task.findById(id);
  if (!foundTask) throw validateError(statusDict.conflict, 'Invalid task id');

  if (!foundTask.userId.equals(user._id)) {
    throw validateError(statusDict.unauthorized, 'You cannot edit this task');
  }

  const removedTask = await Task.findByIdAndRemove(id);

  return removedTask;
};

module.exports = {
  create,
  getAll,
  edit,
  remove,
};
