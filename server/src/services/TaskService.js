const Task = require('../models/Task');
const User = require('../models/User');
const TaskSchema = require('../schemas/taskSchema');
const { validateError } = require('../helpers');

const create = async (input) => {
  const { error } = TaskSchema.validate(input);

  if (error) throw validateError(400, error.message);

  const user = await User.findById(input.userId);
  console.log(user);

  if (!user) throw validateError(400, '"UserId" must be a valid');

  const newTask = new Task(input);

  try {
    await newTask.save();
    return true;
  } catch (err) {
    throw validateError(409, err.message);
  }
};

module.exports = {
  create,
};
