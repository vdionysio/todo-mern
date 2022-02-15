const mongoose = require('mongoose');
const db = require('../../db');
const User = require('../../../src/models/User');

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe('User model', () => {
  it('create user succesfully with required and valid fileds', async () => {
    const newUser = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    });

    await newUser.setPassword('123456789');

    const savedUser = await newUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.displayName).toBe('Dionysio');
  });
});
