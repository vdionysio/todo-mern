const { getMockReq, getMockRes } = require('@jest-mock/express');
const { ObjectId } = require('mongodb');
const TaskController = require('../../../src/controllers/TaskController');
const User = require('../../../src/models/User');
const Task = require('../../../src/models/Task');
const db = require('../../db');
const { statusDict } = require('../../../src/helpers');

describe('Task controller - create Task', () => {
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

  it('When the inputs are valid should response with status 200 and a message "Task created"', async () => {
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
