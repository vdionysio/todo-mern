import React, { useContext } from 'react';
import Header from '../components/Header';
import NewTaskForm from '../components/NewTaskForm';
import TaskTable from '../components/TaskTable';
import UserContext from '../context/UserContext';

function HomeUser() {
  const { user, tasks } = useContext(UserContext);
  console.log(tasks, user);

  return (
    <div>
      {user && <Header {...user} />}
      <NewTaskForm />
      {tasks && <TaskTable tasks={tasks} />}
    </div>
  );
}

export default HomeUser;
