import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByToken } from '../api/requests';
import EditTaskForm from '../components/EditTaskForm';
import FilterBox from '../components/FilterBox';
import Header from '../components/Header';
import NewTaskForm from '../components/NewTaskForm';
import TaskList from '../components/TaskList';
import UserContext from '../context/UserContext';

function HomeUser() {
  const navigate = useNavigate();
  const { user, token, editingTask } = useContext(UserContext);

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
      {editingTask ? <EditTaskForm /> : <NewTaskForm />}
      <FilterBox />
      <TaskList />
    </div>
  );
}

export default HomeUser;
