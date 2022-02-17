import React, { useCallback, useEffect, useState } from 'react';
import UserContext from './UserContext';
import PropTypes from 'prop-types';
import { getUserByToken, getUserTasks, loginAuthentication, register } from '../api/requests';
import { useLocalStorage } from '../helpers';

function UserProvider({ children }) {
  const [token, setToken] = useLocalStorage('token');
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState();
  const [shouldUpdateList, setShouldUpdateList] = useState(true);
  // const [authError, setAuthError] = useState(false);

  const registerUser = useCallback((registerInputs) => {
    register(registerInputs)
      .then((response) => {
        console.log(response);
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
        console.log(response);
        setToken(response.token);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }, []);

  useEffect(() => {
    const fillUserInfo = async () => {
      const info = await getUserByToken(token);
      setUser(info);
    };
    const fillTasks = async () => {
      const data = await getUserTasks(token);
      setTasks(data.tasks);
    };
    if (token) {
      fillUserInfo();
      fillTasks();
    }
  }, [token]);

  useEffect(() => {
    const fillTasks = async () => {
      const data = await getUserTasks(token);
      setTasks(data.tasks);
    };
    if (token) {
      fillTasks();
    }
  }, [token, shouldUpdateList]);

  const contextValue = {
    token,
    setToken,
    registerUser,
    login,
    user,
    tasks,
    shouldUpdateList,
    setShouldUpdateList
  };
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default UserProvider;
