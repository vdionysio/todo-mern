import React, { useContext } from 'react';
import { CardGroup } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import TaskCard from './TaskCard';

function TaskList() {
  const { tasks } = useContext(UserContext);
  return (
    <CardGroup style={{ display: 'flex', flexDirection: 'column' }}>
      {tasks && tasks.map((task, index) => <TaskCard key={`task-${index}`} task={task} />)}
    </CardGroup>
  );
}

export default TaskList;
