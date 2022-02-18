const { getMockReq, getMockRes } = require('@jest-mock/express');
const UserController = require('../../../src/controllers/UserController');
const { generateToken, statusDict } = require('../../../src/helpers');
const UserService = require('../../../src/services/UserService');

describe('User controller - Create User', () => {
  const validInputs = {
    displayName: 'Dionysio',
    email: 'dionysio@gmail.com',
    password: '123456789',
  };

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('When the inputs are valid should response with status 201 and a token', async () => {
    jest.spyOn(UserService, 'create').mockReturnValue(true);

    const req = getMockReq({
      body: validInputs,
    });
    const { res, next } = getMockRes();

    await UserController.create(req, res, next);
    const token = generateToken(validInputs.email);

    expect(res.status).toHaveBeenCalledWith(statusDict.created);
    expect(res.json).toHaveBeenCalledWith({ token });
  });
});

describe('User controller - Login', () => {
  const validInputs = {
    email: 'dionysio@gmail.com',
    password: '123456789',
  };

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('When the inputs are valid should response with status 200 and a token', async () => {
    jest.spyOn(UserService, 'login').mockReturnValue(true);

    const req = getMockReq({
      body: validInputs,
    });
    const { res, next } = getMockRes();

    await UserController.login(req, res, next);
    const token = generateToken(validInputs.email);

    expect(res.status).toHaveBeenCalledWith(statusDict.ok);
    expect(res.json).toHaveBeenCalledWith({ token });
  });
});
