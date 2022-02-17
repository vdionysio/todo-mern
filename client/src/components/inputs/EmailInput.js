import React from 'react';
import PropTypes from 'prop-types';
import { validateEmail } from '../../helpers';

function EmailInput({ email, setEmail }) {
  return (
    <label>
      {email != '' && !validateEmail(email) && <span>Invalid</span>}
      Email
      <input
        className="input-text"
        type="email"
        onBlur={({ target: { value } }) => setEmail(value)}
        name="email"
      />
    </label>
  );
}

EmailInput.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func
};

export default EmailInput;
