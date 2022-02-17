const { getMockReq, getMockRes } = require('@jest-mock/express');
const { ObjectId } = require('mongodb');
const TaskController = require('../../../src/controllers/TaskController');
const User = require('../../../src/models/User');
const Task = require('../../../src/models/Task');
const db = require('../../db');

describe('Task controller', () => {
  const baseUser = {
    displayName: 'Dionysio',
    email: 'dionysio@gmail.com',
    password: '123456789',
  };

  beforeAll(async () => {
    await db.setUp();
  });

  afterEach(async () => {
    await db.dropCollections();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  it('When the inputs are valid should response with status 200 and a message "Task created"', async () => {
    const newUser = new User(baseUser);
    const savedUser = await newUser.save();
    const validTask = {
      name: 'Task name',
      description: 'description',
      status: 'open',
    };
    const fakeId = ObjectId('507f191e810c19729de860ea');
    const savedTask = {
      _id: fakeId,
      name: 'Task name',
      description: 'description',
      status: 'open',
      userId: savedUser._id,
    };

    jest.spyOn(Task.prototype, 'save').mockImplementationOnce(() => savedTask);

    const req = getMockReq({
      body: validTask,
      user: { email: 'dionysio@gmail.com' },
    });
    const { res, next } = getMockRes();

    await TaskController.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task created' });
  });

  it('When name is missing should execute next', async () => {
    const newUser = new User(baseUser);
    await newUser.save();

    const req = getMockReq({
      body: {
        description: 'description',
        status: 'open',
      },
      user: { email: 'dionysio@gmail.com' },
    });
    const { res, next } = getMockRes();
    await TaskController.create(req, res, next);
    expect(next).toHaveBeenCalledWith({
      message: '"name" is required',
      status: 400,
    });
  });

  it('When status is different than open or closed should execute next', async () => {
    const newUser = new User(baseUser);
    await newUser.save();

    const req = getMockReq({
      body: {
        name: 'Task name',
        description: 'description',
        status: 'invalid status',
      },
      user: { email: 'dionysio@gmail.com' },
    });
    const { res, next } = getMockRes();
    await TaskController.create(req, res, next);
    expect(next).toHaveBeenCalledWith({
      message: '"status" must be one of [open, closed, pending]',
      status: 400,
    });
  });

  it('When user email is invalid should execute next', async () => {
    const newUser = new User(baseUser);
    await newUser.save();

    const req = getMockReq({
      body: {
        name: 'Task name',
        description: 'description',
        status: 'open',
      },
      user: { email: 'invalid@gmail.com' },
    });
    const { res, next } = getMockRes();
    await TaskController.create(req, res, next);
    expect(next).toHaveBeenCalledWith({
      message: 'Token must be valid',
      status: 400,
    });
  });
});
