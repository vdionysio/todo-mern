import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByToken } from '../api/requests';
import EditTaskForm from '../components/EditTaskForm';
import Header from '../components/Header';
import NewTaskForm from '../components/NewTaskForm';
import TaskList from '../components/TaskList';
import UserContext from '../context/UserContext';

// const sortAux = (ord, valueA, valueB) => {
//   if (valueA < valueB) {
//     return ord === 'ASC' ? -1 : 1;
//   }
//   if (valueA > valueB) {
//     return ord === 'ASC' ? 1 : -1;
//   }
//   return 0;
// };

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
      <TaskList />
    </div>
  );
}

export default HomeUser;
