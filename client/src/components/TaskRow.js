import React from 'react';
import PropTypes from 'prop-types';

function TaskRow({ task }) {
  return (
    <tr>
      {Object.values(task).map((value) => (
        <td key={value}>{value}</td>
      ))}
    </tr>
  );
}

TaskRow.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    createdAt: PropTypes.any
  })
};

export default TaskRow;
