const UserService = require('../../../src/services/UserService');
const User = require('../../../src/models/User');
const db = require('../../db');
const { statusDict } = require('../../../src/helpers');

const validInputs = {
  displayName: 'valid user',
  email: 'valid@email.com',
  password: 'validpassword',
};

describe('User service - Create User', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return true when user is successfully created', async () => {
    const fakeReturn = {
      _id: '12312312312312',
      ...validInputs,
    };

    jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => fakeReturn);

    const result = await UserService.create(validInputs);
    expect(result).toBeTruthy();
  });

  it('should return an error when user email is invalid', async () => {
    const invalidEmail = {
      displayName: validInputs.displayName,
      email: 'invalid@emailcom',
      password: validInputs.password,
    };

    await expect(UserService.create(invalidEmail)).rejects.toMatchObject({
      message: '"email" must be a valid email',
      status: statusDict.badRequest,
    });
  });

  it('should return an error when user password length is less than 6', async () => {
    const invalidUser = {
      displayName: validInputs.displayName,
      email: validInputs.email,
      password: '12345',
    };

    await expect(UserService.create(invalidUser)).rejects.toMatchObject({
      message: '"password" length must be at least 6 characters long',
      status: statusDict.badRequest,
    });
  });

  it('should return an error when email is already registered', async () => {
    await db.setUp();
    const firstUser = new User(validInputs);
    const secondUser = new User(validInputs);
    await firstUser.save();

    await expect(secondUser.save()).rejects.toThrowError(
      `E11000 duplicate key error dup key: { : "${validInputs.email}" }`
    );

    await db.dropCollections();
    await db.dropDatabase();
  });
});

describe('User service - Login', () => {
  beforeAll(async () => {
    await db.setUp();
    const newUser = new User(validInputs);
    await newUser.save();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await db.dropCollections();
    await db.dropDatabase();
  });

  it('should return true when user is successfully logged', async () => {
    const result = await UserService.login({
      email: validInputs.email,
      password: validInputs.password,
    });

    expect(result).toBeTruthy();
  });

  it('should throw an error when password didnt match', async () => {
    await expect(
      UserService.login({
        email: validInputs.email,
        password: 'invalidapass',
      })
    ).rejects.toThrowError({
      message: 'Invalid user or password',
      status: statusDict.unauthorized,
    });
  });
});
