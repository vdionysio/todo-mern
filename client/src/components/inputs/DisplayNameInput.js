import React from 'react';
import PropTypes from 'prop-types';
import { validateLength } from '../../helpers';

function DisplayNameInput({ displayName, setDisplayName }) {
  return (
    <label htmlFor="display-name">
      Display name
      {displayName != '' && !validateLength(displayName, 6) && <span>Invalid</span>}
      <input
        className="input-text"
        type="text"
        onBlur={({ target: { value } }) => setDisplayName(value)}
        name="display-name"
      />
    </label>
  );
}

DisplayNameInput.propTypes = {
  displayName: PropTypes.string,
  setDisplayName: PropTypes.func
};

export default DisplayNameInput;
