const UserService = require('../../../src/services/UserService');
const User = require('../../../src/models/User');

describe('User service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true when user is succesfully created', async () => {
    const fakeUser = new User({
      displayName: 'fakeUser',
      email: 'fake@email.com',
      password: 'fakepassword',
    });

    const fakeReturn = {
      _id: '12312312312312',
      displayName: 'fakeUser',
      email: 'fake@email.com',
      password: 'fakepassword',
    };
    jest.spyOn(fakeUser, 'save').mockImplementationOnce(() => fakeReturn);

    const result = await UserService.create(fakeUser);
    expect(result).toBeTruthy();
  });

  it('should return an error when user email is invalid', async () => {
    const invalidUser = new User({
      displayName: 'invalidUser',
      email: 'invalid@email',
      password: 'invalidpassword',
    });
    // const test = invalidUser.save();
    await expect(await UserService.create(invalidUser)).rejects.toThrowError();
  });
});
