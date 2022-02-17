import React, { useContext } from 'react';
import TaskRow from './TaskRow';
import UserContext from '../context/UserContext';

const labels = ['name', 'description', 'status', 'created at'];

function TaskTable() {
  const { filteredTasks } = useContext(UserContext);
  if (!filteredTasks) return <p>Loading</p>;
  if (filteredTasks.length === 0) return <p>You have not added any tasks yet.</p>;
  return (
    <table>
      <thead>
        <tr>
          {labels.map((label, index) => (
            <th key={`${label}${index}`}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredTasks && filteredTasks.map((task) => <TaskRow key={task._id} task={task} />)}
      </tbody>
    </table>
  );
}

export default TaskTable;
