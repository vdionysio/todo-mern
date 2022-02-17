import React from 'react';
import PropTypes from 'prop-types';
import TaskRow from './TaskRow';

const labels = ['name', 'description', 'status', 'created at'];

function TaskTable({ tasks }) {
  if (!tasks) return <p>Loading</p>;
  if (tasks.length === 0) return <p>You have not added any tasks yet.</p>;
  return (
    <table>
      <thead>
        <tr>
          {labels.map((label, index) => (
            <th key={`${label}${index}`}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>{tasks && tasks.map((task) => <TaskRow key={task._id} task={task} />)}</tbody>
    </table>
  );
}

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf({})
};

export default TaskTable;
