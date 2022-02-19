const { getMockReq, getMockRes } = require('@jest-mock/express');
const { error } = require('../../../src/middlewares');

describe('validateJWT middleware', () => {
  it('when the error does not have a status, it should call status with 500', async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();

    const err = new Error('Error without status');

    await error(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('when the error has a status it must be called as an argument', async () => {
    const req = getMockReq();
    const { res, next } = getMockRes();

    const err = new Error('Error with status');
    err.status = 400;

    await error(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
