const TaskService = require('../../../src/services/TaskService');
const User = require('../../../src/models/User');
const Task = require('../../../src/models/Task');
const db = require('../../db');
const { ObjectId } = require('mongodb');
const { statusDict } = require('../../../src/helpers');

describe('Task service - Create', () => {
  let savedUser;
  let validTaskInput;

  beforeAll(async () => {
    await db.setUp();
    const newUser = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    });
    savedUser = await newUser.save();
    validTaskInput = {
      name: 'Task name',
      description: 'description',
      status: 'open',
      userId: savedUser._id,
    };
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  it('should return the task when task is successfully created', async () => {
    const mockReturn = {
      _id: '12312312312312',
      ...validTaskInput,
    };

    jest.spyOn(Task.prototype, 'save').mockImplementationOnce(() => mockReturn);

    const result = await TaskService.create(validTaskInput, savedUser.email);
    expect(result).toBe(mockReturn);
  });

  it('should return an error when name is missing', async () => {
    const missingName = {
      description: validTaskInput.description,
      status: validTaskInput.status,
      userId: validTaskInput.userId,
    };

    await expect(
      TaskService.create(missingName, 'dionysio@gmail.com')
    ).rejects.toMatchObject({
      message: '"name" is required',
      status: statusDict.badRequest,
    });
  });

  it('should return an error when status is missing', async () => {
    const missingStatus = {
      name: validTaskInput.name,
      description: validTaskInput.description,
      userId: validTaskInput.userId,
    };

    await expect(
      TaskService.create(missingStatus, 'dionysio@gmail.com')
    ).rejects.toMatchObject({
      message: '"status" is required',
      status: statusDict.badRequest,
    });
  });

  it('should return an error when userEmail invalid', async () => {
    const invalidUserId = {
      name: validTaskInput.name,
      description: validTaskInput.description,
      status: validTaskInput.status,
      userId: ObjectId('507f191e810c19729de860ea'),
    };

    await expect(
      TaskService.create(invalidUserId, 'invalid@gmail.com')
    ).rejects.toMatchObject({
      message: 'Token must be valid',
      status: statusDict.unauthorized,
    });
  });
});
