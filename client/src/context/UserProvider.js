import React, { useEffect, useState } from 'react';
import UserContext from './UserContext';
import PropTypes from 'prop-types';
import { getUserByToken, getUserTasks } from '../api/requests';
import { useLocalStorage } from '../helpers';

function UserProvider({ children }) {
  const [token, setToken] = useLocalStorage('token');
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState();
  const [filteredTasks, setFilteredTasks] = useState();
  const [shouldUpdateList, setShouldUpdateList] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
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

  const contextValue = {
    token,
    setToken,
    user,
    setTasks,
    tasks,
    shouldUpdateList,
    setShouldUpdateList,
    filteredTasks,
    setFilteredTasks,
    isLoadingTasks,
    setIsLoadingTasks
  };
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default UserProvider;
