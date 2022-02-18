const db = require('../../db');
const Task = require('../../../src/models/Task');
const { ObjectId } = require('mongodb');

const validInputs = {
  name: 'Tarefa',
  description: 'descrição da tarefa 1',
  status: 'open',
  userId: ObjectId('507f191e810c19729de860ea'),
};

describe('Task model - Create Task', () => {
  beforeAll(async () => {
    await db.setUp();
  });

  afterEach(async () => {
    await db.dropCollections();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  it('create task succesfully with required and valid fields', async () => {
    const newTask = new Task(validInputs);
    const savedTask = await newTask.save();
    expect(savedTask._id).toBeDefined();
    expect(savedTask.createdAt).toBeDefined();
    expect(savedTask.updatedAt).toBeDefined();
    expect(savedTask.name).toBe(validInputs.name);
  });

  it('create task wont work without name field', async () => {
    const withoutName = new Task({
      description: validInputs.description,
      status: validInputs.status,
      userId: validInputs.userId,
    });

    await expect(withoutName.save()).rejects.toThrowError();
  });

  it('create task wont work without status field', async () => {
    const withoutStatus = new Task({
      name: validInputs.name,
      description: validInputs.description,
      userId: validInputs.userId,
    });
    await expect(withoutStatus.save()).rejects.toThrowError();
  });

  it('create task wont work without userID field', async () => {
    const withoutUserId = new Task({
      name: 'Tarefa 1',
      description: 'descrição da tarefa 1',
      status: 'open',
    });

    await expect(withoutUserId.save()).rejects.toThrowError();
  });
});
