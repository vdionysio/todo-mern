import React from 'react';
import PropTypes from 'prop-types';

function Header({ displayName, email }) {
  return (
    <header>
      <span>{displayName}</span>
      <span>{email}</span>
    </header>
  );
}

Header.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string
};

export default Header;
