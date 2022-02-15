const { getMockReq, getMockRes } = require('@jest-mock/express');
const UserController = require('../../../src/controllers/UserController');
const { generateToken } = require('../../../src/helpers');
const User = require('../../../src/models/User');

describe('User controller', () => {
  const validUser = {
    displayName: 'Dionysio',
    email: 'dionysio@gmail.com',
    password: '123456789',
  };

  const savedUser = {
    _id: '12312312312312',
    displayName: 'Dionysior',
    email: 'dionysio@gmail.com',
    password: '123456789',
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('When the inputs are valid should response with status 200 and a token', async () => {
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => savedUser);

    const req = getMockReq({
      body: validUser,
    });
    const { res, next } = getMockRes();

    await UserController.create(req, res, next);
    const token = generateToken(validUser.email);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ token });
  });

  it('When email is invalid should should execute next', async () => {
    const req = getMockReq({
      body: {
        displayName: 'Dionysio',
        email: 'dionysio@gmailcom',
        password: '123456789',
      },
    });
    const { res, next } = getMockRes();
    await UserController.create(req, res, next);
    expect(next).toHaveBeenCalledWith({
      message: '"email" must be a valid email',
      status: 400,
    });
  });

  it('When pass lenth is less than 6 should execute next', async () => {
    const req = getMockReq({
      body: {
        displayName: 'Dionysio',
        email: 'dionysio@gmail.com',
        password: '12345',
      },
    });
    const { res, next } = getMockRes();
    await UserController.create(req, res, next);
    expect(next).toHaveBeenCalledWith({
      message: '"password" length must be at least 6 characters long',
      status: 400,
    });
  });

  it('When displayName lenth is less than 6 should repsonse with status 400 and message "ADICIONAR A MENSAGEM"', async () => {
    const req = getMockReq({
      body: {
        displayName: 'Diony',
        email: 'dionysio@gmail.com',
        password: '1234567',
      },
    });
    const { res, next } = getMockRes();
    await UserController.create(req, res, next);
    expect(next).toHaveBeenCalledWith({
      message: '"displayName" length must be at least 6 characters long',
      status: 400,
    });
  });

  // it('When email is already registered should repsonse with status 400 and message "User already registered"', async () => {
  //   const req = getMockReq({
  //     body: {
  //       displayName: 'Dionysio',
  //       email: 'dionysio@gmail.com',
  //       password: '1234567',
  //     },
  //   });
  //   const { res, next } = getMockRes();
  //   await UserController.create(req, res, next);
  //   expect(res).toHaveBeenCalled();
  // });
});
