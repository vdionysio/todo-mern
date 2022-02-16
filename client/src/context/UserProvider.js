import React, { useState } from 'react';
import UserContext from './UserContext';
import PropTypes from 'prop-types';

function UserProvider({ children }) {
  const [token, setToken] = useState('');
  const contextValue = { token, setToken };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default UserProvider;
