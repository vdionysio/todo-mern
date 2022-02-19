const { getMockReq, getMockRes } = require('@jest-mock/express');
const { ObjectId } = require('mongodb');
const TaskController = require('../../../src/controllers/TaskController');
const TaskService = require('../../../src/services/TaskService');

const User = require('../../../src/models/User');
const Task = require('../../../src/models/Task');
const db = require('../../db');
const { statusDict } = require('../../../src/helpers');

describe('Task controller - Create Task', () => {
  const baseUser = {
    displayName: 'Dionysio',
    email: 'dionysio@gmail.com',
    password: '123456789',
  };

  beforeAll(async () => {
    await db.setUp();
  });

  afterAll(async () => {
    await db.dropCollections();
    jest.restoreAllMocks();
    await db.dropDatabase();
  });

  it('When the inputs are valid should response with status 200', async () => {
    const newUser = new User(baseUser);
    const savedUser = await newUser.save();
    const validTask = {
      name: 'Task name',
      description: 'description',
      status: 'open',
      userId: savedUser._id,
    };
    const fakeId = ObjectId('507f191e810c19729de860ea');
    const savedTask = {
      _id: fakeId,
      ...validTask,
    };

    jest.spyOn(Task.prototype, 'save').mockImplementationOnce(() => savedTask);

    const req = getMockReq({
      body: validTask,
      user: { email: 'dionysio@gmail.com' },
    });
    const { res, next } = getMockRes();

    await TaskController.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(statusDict.created);
  });
});

describe('Task controller - Get All Tasks', () => {
  const baseUser = {
    displayName: 'Dionysio',
    email: 'dionysio@gmail.com',
    password: '123456789',
  };

  beforeAll(async () => {
    await db.setUp();
  });

  afterAll(async () => {
    await db.dropCollections();
    jest.restoreAllMocks();
    await db.dropDatabase();
  });

  it('Should return a list of tasks and status 200 on route GET /task', async () => {
    const newUser = new User(baseUser);
    const savedUser = await newUser.save();
    const validTask = {
      name: 'Task name',
      description: 'description',
      status: 'open',
      userId: savedUser._id,
    };
    const fakeId = ObjectId('507f191e810c19729de860ea');
    const savedTask = {
      _id: fakeId,
      ...validTask,
    };

    jest.spyOn(TaskService, 'getAll').mockReturnValue([savedTask, savedTask]);

    const req = getMockReq({
      user: { email: 'dionysio@gmail.com' },
    });
    const { res, next } = getMockRes();

    await TaskController.getAll(req, res, next);

    expect(res.status).toHaveBeenCalledWith(statusDict.ok);
    expect(res.json).toHaveBeenCalledWith({ tasks: [savedTask, savedTask] });
  });
});

describe('Task controller - Edit Task', () => {
  const baseUser = {
    displayName: 'Dionysio',
    email: 'dionysio@gmail.com',
    password: '123456789',
  };

  beforeAll(async () => {
    jest.restoreAllMocks();
    await db.setUp();
  });

  afterAll(async () => {
    await db.dropCollections();
    await db.dropDatabase();
  });

  it('When the inputs are valid should response with status 200 and return the edited task', async () => {
    const newUser = new User(baseUser);
    const savedUser = await newUser.save();
    const validTask = {
      name: 'Task name',
      description: 'description',
      status: 'open',
      userId: savedUser._id,
    };

    const newTask = new Task(validTask);
    const savedTask = await newTask.save();

    const req = getMockReq({
      body: { description: 'new description' },
      params: { id: savedTask._id },
    });
    const { res, next } = getMockRes();

    await TaskController.edit(req, res, next);

    expect(res.status).toHaveBeenCalledWith(statusDict.created);
  });
});
