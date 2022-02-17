import React, { useCallback, useState } from 'react';
import UserContext from './UserContext';
import PropTypes from 'prop-types';
import { loginAuthentication, register } from '../api/requests';

function UserProvider({ children }) {
  const [token, setToken] = useState();
  // const [authError, setAuthError] = useState(false);

  const registerUser = useCallback((registerInputs) => {
    register(registerInputs)
      .then((response) => {
        setToken(response.token);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }, []);

  const login = useCallback((loginInputs) => {
    loginAuthentication(loginInputs)
      .then((response) => {
        setToken(response.token);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }, []);

  const contextValue = { token, setToken, registerUser, login };
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default UserProvider;
