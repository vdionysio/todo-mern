const db = require('../../db');
const User = require('../../../src/models/User');

describe('User model', () => {
  it('create user succesfully with required and valid fileds', () => {
    const newUser = new User({
      displayName: 'Dionysio',
      email: 'dionysio@gmail.com',
      password: '123456789',
    });

    await newUser.setPassword('123456789');

    const savedUser = await newUser.save();
  });
});
