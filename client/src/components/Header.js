import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';

function Header({ displayName, email }) {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);
  const logOut = useCallback(() => {
    setToken();
    navigate('/');
  }, []);
  return (
    <header>
      <span>{displayName}</span>
      <span>{email}</span>
      <button type="button" onClick={logOut}>
        Logout
      </button>
    </header>
  );
}

Header.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string
};

export default Header;
