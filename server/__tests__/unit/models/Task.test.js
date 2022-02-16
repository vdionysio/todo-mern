const db = require('../../db');
const Task = require('../../../src/models/Task');
const { ObjectId } = require('mongodb');

describe('Task model', () => {
  const fakeId = ObjectId('507f191e810c19729de860ea');
  beforeAll(async () => {
    await db.setUp();
  });

  afterEach(async () => {
    await db.dropCollections();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  it('create a taks succesfully with required and valid fileds', async () => {
    const newTask = new Task({
      name: 'Tarefa 1',
      description: 'descrição da tarefa 1',
      status: 'open',
      userId: fakeId,
    });

    const savedTask = await newTask.save();
    expect(savedTask._id).toBeDefined();
    expect(savedTask.name).toBe('Tarefa 1');
  });

  it('create user wont work without required and valid fileds', async () => {
    const withoutName = new Task({
      description: 'descrição da tarefa 1',
      status: 'open',
      userId: fakeId,
    });

    await expect(withoutName.save()).rejects.toThrowError();

    const withoutStatus = new Task({
      name: 'Tarefa 1',
      description: 'descrição da tarefa 1',
      userId: fakeId,
    });
    await expect(withoutStatus.save()).rejects.toThrowError();

    const withoutUserId = new Task({
      name: 'Tarefa 1',
      description: 'descrição da tarefa 1',
      status: 'open',
    });

    await expect(withoutUserId.save()).rejects.toThrowError();
  });
});
