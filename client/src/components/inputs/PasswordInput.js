import React from 'react';
import PropTypes from 'prop-types';
import { validateLength } from '../../helpers';

function PasswordInput({ password, setPassword }) {
  return (
    <label>
      {password != '' && !validateLength(password, 6) && <span>Invalid</span>}
      Password
      {<span></span>}
      <input
        className="input-text"
        type="password"
        onBlur={({ target: { value } }) => setPassword(value)}
        name="password"
      />
    </label>
  );
}

PasswordInput.propTypes = {
  password: PropTypes.string,
  setPassword: PropTypes.func
};

export default PasswordInput;
