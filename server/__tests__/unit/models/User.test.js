const db = require('../../db');
const User = require('../../../src/models/User');

describe('User model', () => {
  beforeAll(async () => {
    await db.setUp();
  });

  afterEach(async () => {
    await db.dropCollections();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  it('create user succesfully with required and valid fileds', async () => {
    const newUser = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    });

    const savedUser = await newUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.displayName).toBe('Dionysio');
    savedUser.comparePassword('123456789', (isMatch) => {
      expect(isMatch).toBeTruthy();
    });
  });

  it('create user wont work without required and valid fileds', async () => {
    const withoutName = new User({
      email: 'dionysio@gmail.com',
      password: '123456789',
    });
    await expect(withoutName.save()).rejects.toThrowError();

    const withoutEmail = new User({
      displayName: 'Dionysio',
      password: '123456789',
    });
    await expect(withoutEmail.save()).rejects.toThrowError();

    const withoutPassword = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
    });
    await expect(withoutPassword.save()).rejects.toThrowError();
  });
  // duplicate key error collection
  it('create user wont work if email was already registered', async () => {
    const validInputs = {
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    };

    const firstUser = new User(validInputs);
    const secondUser = new User(validInputs);

    await firstUser.save();
    await expect(secondUser.save()).rejects.toThrowError();

    const withoutEmail = new User({
      displayName: 'Dionysio',
      password: '123456789',
    });
    await expect(withoutEmail.save()).rejects.toThrowError();

    const withoutPassword = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
    });
    await expect(withoutPassword.save()).rejects.toThrowError();
  });
});
