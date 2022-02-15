const { getMockReq, getMockRes } = require('@jest-mock/express');
const UserController = require('../../../src/controllers/UserController');
const helpers = require('../../../src/helpers');
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

  const fakeToken = '1f2a3k4e5t6o7k8e9n';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('When the inputs are valid should response with status 200 and a token', async () => {
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => savedUser);
    jest.spyOn(helpers, 'generateToken').mockImplementation(() => fakeToken);

    const req = getMockReq({
      body: validUser,
    });
    const { res } = getMockRes();

    await UserController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: fakeToken });
  });

  it('When email is invalid should repsonse with status 400 and message "ADICIONAR A MENSAGEM"', async () => {
    const req = getMockReq({
      body: {
        displayName: 'Dionysio',
        email: 'dionysio@gmailcom',
        password: '123456789',
      },
    });
    const { res } = getMockRes();

    await UserController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'asdasdasdas' });
  });

  it('When pass lenth is less than 6 should repsonse with status 400 and message "ADICIONAR A MENSAGEM"', async () => {
    const req = getMockReq({
      body: {
        displayName: 'Dionysio',
        email: 'dionysio@gmail.com',
        password: '12345',
      },
    });
    const { res } = getMockRes();

    await UserController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'asdasdasdas' });
  });

  it('When displayName lenth is less than 6 should repsonse with status 400 and message "ADICIONAR A MENSAGEM"', async () => {
    const req = getMockReq({
      body: {
        displayName: 'Dionysio',
        email: 'dionysio@gmail.com',
        password: '12345',
      },
    });
    const { res } = getMockRes();

    await UserController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'asdasdasdas' });
  });

  it('When email is already registered should repsonse with status 400 and message "User already registered"', async () => {
    const req = getMockReq({
      body: {
        displayName: 'Dionysio',
        email: 'dionysio@gmail.com',
        password: '12345',
      },
    });
    const { res } = getMockRes();

    await UserController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User already registered',
    });
  });
});
