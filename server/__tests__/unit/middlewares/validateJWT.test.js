const { getMockReq, getMockRes } = require('@jest-mock/express');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../../src/helpers');
const { validateJWT } = require('../../../src/middlewares');
const User = require('../../../src/models/User');
const db = require('../../db');

describe('validateJWT middleware', () => {
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

  it('When the token is valid should call next and add user to req', async () => {
    const token = generateToken(savedUser.email);
    const req = getMockReq({
      headers: {
        authorization: token,
      },
    });
    const { res, next } = getMockRes();

    await validateJWT(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.user).toMatchObject(
      jwt.verify(token, process.env.JWT_SECRET || 'secretkey')
    );
  });

  it('When the token is missing should call next with an error message "Missing auth token"', async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();

    await validateJWT(req, res, next);

    expect(next).toHaveBeenCalledWith(Error('Missing auth token'));
  });

  it('When the token is invalid should call next with an error message "Invalid signature"', async () => {
    const req = getMockReq({
      headers: {
        authorization: 'invalidToken',
      },
    });
    const { res, next } = getMockRes();

    await validateJWT(req, res, next);

    expect(next).toHaveBeenCalledWith(Error('Invalid signature'));
  });

  it('When the token is not associated with a valid user should call next with error message "User not registered"', async () => {
    const token = generateToken('notregistered@gmail.com');
    const req = getMockReq({
      headers: {
        authorization: token,
      },
    });
    const { res, next } = getMockRes();

    await validateJWT(req, res, next);

    expect(next).toHaveBeenCalledWith(Error('User not registered'));
  });
});
