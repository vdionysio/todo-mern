const UserService = require('../../../src/services/UserService');
const User = require('../../../src/models/User');
const db = require('../../db');

describe('User service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true when user is succesfully created', async () => {
    const fakeUser = {
      displayName: 'fakeUser',
      email: 'fake@email.com',
      password: 'fakepassword',
    };

    const fakeReturn = {
      _id: '12312312312312',
      displayName: 'fakeUser',
      email: 'fake@email.com',
      password: 'fakepassword',
    };
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => fakeReturn);

    const result = await UserService.create(fakeUser);
    expect(result).toBeTruthy();
  });

  it('should return an error when user email is invalid', async () => {
    const invalidUser = {
      displayName: 'validUser',
      email: 'invalid@email',
      password: '123456',
    };

    await expect(UserService.create(invalidUser)).rejects.toMatchObject({
      message: '"email" must be a valid email',
      status: 400,
    });
  });

  it('should return an error when user password length is less than 6', async () => {
    const invalidUser = {
      displayName: 'invalidUser',
      email: 'invalid@email.com',
      password: '12345',
    };

    await expect(UserService.create(invalidUser)).rejects.toMatchObject({
      message: '"password" length must be at least 6 characters long',
      status: 400,
    });
  });

  it('should return an error when user email is invalid', async () => {
    const invalidUser = {
      displayName: 'invalidUser',
      email: 'invalid@email',
      password: 'invalidpassword',
    };

    await expect(UserService.create(invalidUser)).rejects.toMatchObject({
      message: '"email" must be a valid email',
      status: 400,
    });
  });

  it('should return an error when user email is already registered', async () => {
    await db.setUp();
    const inputs = {
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    };
    const firstUser = new User(inputs);
    const secondUser = new User(inputs);
    await firstUser.save();

    await expect(secondUser.save()).rejects.toThrow();

    await db.dropCollections();
    await db.dropDatabase();
  });
});
