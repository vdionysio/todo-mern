import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByToken } from '../api/requests';
import Header from '../components/Header';
import NewTaskForm from '../components/NewTaskForm';
import TaskList from '../components/TaskList';
import UserContext from '../context/UserContext';

const sortAux = (ord, valueA, valueB) => {
  if (valueA < valueB) {
    return ord === 'ASC' ? -1 : 1;
  }
  if (valueA > valueB) {
    return ord === 'ASC' ? 1 : -1;
  }
  return 0;
};

function HomeUser() {
  const navigate = useNavigate();
  const { user, filteredTasks, setFilteredTasks, tasks, token } = useContext(UserContext);
  const [sortSettings, setSortSettings] = useState({ column: 'createdAt', ord: 'ASC' });
  const sortTasks = useCallback(() => {
    const { column, ord } = sortSettings;
    const filtered = [...tasks].sort((a, b) => {
      var valueA = a[column].toUpperCase();
      console.log(valueA);
      var valueB = b[column].toUpperCase();
      console.log(valueB);
      return sortAux(ord, valueA, valueB);
    });
    console.log(filtered);
    setFilteredTasks(filtered);
  }, [tasks, sortSettings]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const checkToken = async () => {
      const result = await getUserByToken(token);
      if (result.message) {
        alert(`${result.message}: enter with your account`);
        navigate('/');
      }
    };
    checkToken();
  }, [token]);

  return (
    <div>
      {user && <Header {...user} />}
      <NewTaskForm />
      {filteredTasks && (
        <>
          <label>
            <select
              name="column"
              onChange={({ target }) =>
                setSortSettings({
                  ...sortSettings,
                  [target.name]: target.value
                })
              }>
              <option value="createdAt">Created at</option>
              <option value="name">Name</option>
              <option value="description">Description</option>
            </select>
          </label>
          <label>
            ASC
            <input
              type="radio"
              name="ord"
              value="ASC"
              onChange={({ target }) =>
                setSortSettings({
                  ...sortSettings,
                  [target.name]: target.value
                })
              }
            />
            DESC
            <input
              type="radio"
              name="ord"
              value="DESC"
              onChange={({ target }) =>
                setSortSettings({
                  ...sortSettings,
                  [target.name]: target.value
                })
              }
            />
          </label>
          <button type="button" onClick={sortTasks}>
            Sort
          </button>
          <TaskList />
        </>
      )}
    </div>
  );
}

export default HomeUser;
