import React from 'react';
import PropTypes from 'prop-types';

function CheckPasswordInput({ checkPassword, setCheckPassword, password }) {
  return (
    <label>
      {checkPassword != '' && checkPassword != password && <span>Invalid</span>}
      Confirm Password
      <input
        className="input-text"
        type="password"
        onBlur={({ target: { value } }) => setCheckPassword(value)}
        name="check-password"
      />
    </label>
  );
}

CheckPasswordInput.propTypes = {
  password: PropTypes.string,
  checkPassword: PropTypes.string,
  setCheckPassword: PropTypes.func
};

export default CheckPasswordInput;
