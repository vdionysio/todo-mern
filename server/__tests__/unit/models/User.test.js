const db = require('../../db');
const User = require('../../../src/models/User');

const validInputs = {
  displayName: 'Dionysio',
  email: 'dionysio@gmail.com',
  password: '123456789',
};

describe('User model - Create User', () => {
  beforeAll(async () => {
    await db.setUp();
  });

  afterEach(async () => {
    await db.dropCollections();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  it('create user successfully with required and valid fileds', async () => {
    const newUser = new User(validInputs);
    const savedUser = await newUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.displayName).toBe(validInputs.displayName);
    savedUser.comparePassword(validInputs.password, (isMatch) => {
      expect(isMatch).toBeTruthy();
    });
  });

  it('create user wont work without displayName field', async () => {
    const withoutName = new User({
      email: validInputs.email,
      password: validInputs.password,
    });
    await expect(withoutName.save()).rejects.toThrowError();
  });

  it('create user wont work without email field', async () => {
    const withoutEmail = new User({
      displayName: validInputs.displayName,
      password: validInputs.password,
    });
    await expect(withoutEmail.save()).rejects.toThrowError();
  });

  it('create user wont work without password field', async () => {
    const withoutPassword = new User({
      displayName: validInputs.displayName,
      email: validInputs.email,
    });
    await expect(withoutPassword.save()).rejects.toThrowError();
  });

  it('create user wont work with an already registered email', async () => {
    const firstUser = new User(validInputs);
    const secondUser = new User(validInputs);

    await firstUser.save();
    await expect(secondUser.save()).rejects.toThrowError();
  });
});
