const TaskService = require('../../../src/services/TaskService');
const User = require('../../../src/models/User');
const Task = require('../../../src/models/Task');
const db = require('../../db');
const { ObjectId } = require('mongodb');

describe('Task service', () => {
  let savedUser;
  beforeAll(async () => {
    await db.setUp();
    const newUser = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    });
    savedUser = await newUser.save();
  });

  afterEach(async () => {
    await db.dropCollections();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  it('should return true when task is succesfully created', async () => {
    const fakeTask = {
      name: 'Task name',
      description: 'description',
      status: 'open',
      userId: savedUser._id,
    };

    const fakeReturn = {
      _id: '12312312312312',
      name: 'Task name',
      description: 'description',
      status: 'open',
      userId: savedUser._id,
    };
    jest.spyOn(Task.prototype, 'save').mockImplementationOnce(() => fakeReturn);

    const result = await TaskService.create(fakeTask, savedUser.email);
    expect(result).toBeTruthy();
  });

  it('should return an error when name is missing', async () => {
    const missingName = {
      description: 'description',
      status: 'open',
    };
    const newUser = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    });
    await newUser.save();

    await expect(
      TaskService.create(missingName, 'dionysio@gmail.com')
    ).rejects.toMatchObject({
      message: '"name" is required',
      status: 400,
    });
  });

  it('should return an error when status is missing', async () => {
    const missingStatus = {
      name: 'Task name',
      description: 'description',
      userId: savedUser._id,
    };

    const newUser = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    });
    await newUser.save();

    await expect(
      TaskService.create(missingStatus, 'dionysio@gmail.com')
    ).rejects.toMatchObject({
      message: '"status" is required',
      status: 400,
    });
  });

  it('should return an error when userEmail invalid', async () => {
    const invalidUserId = {
      name: 'Task name',
      description: 'description',
      status: 'open',
      userId: ObjectId('507f191e810c19729de860ea'),
    };
    const newUser = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    });
    await newUser.save();

    await expect(
      TaskService.create(invalidUserId, 'invalid@gmail.com')
    ).rejects.toMatchObject({
      message: 'Token must be valid',
      status: 400,
    });
  });
});
