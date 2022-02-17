import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import EditTaskForm from './EditTaskForm';
import UserContext from '../context/UserContext';
import { removeTask } from '../api/requests';

function TaskRow({ task }) {
  const { token, setShouldUpdateList } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const remove = useCallback(() => {
    removeTask(token, task._id)
      .then((response) => {
        setShouldUpdateList((prev) => !prev);
        setIsEditing((prev) => !prev);
        console.log(response);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }, []);
  if (isEditing)
    return (
      <tr>
        <EditTaskForm taskId={task._id} setIsEditing={setIsEditing} />
      </tr>
    );
  return (
    <tr>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td>{task.status}</td>
      <td>{task.createdAt}</td>
      <td>
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button type="button" onClick={remove}>
          Remove
        </button>
      </td>
    </tr>
  );
}

TaskRow.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    createdAt: PropTypes.string,
    _id: PropTypes.string
  })
};

export default TaskRow;
