import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { editTask } from '../api/requests';
import UserContext from '../context/UserContext';
import TaskForm from './TaskForm';

function EditTaskForm({ taskId, setIsEditing }) {
  const { token, setShouldUpdateList } = useContext(UserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState();

  const edit = useCallback(() => {
    editTask({ name, description, status }, token, taskId)
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
  }, [status, name]);

  const propsObject = {
    setDescription,
    setName,
    setStatus,
    status,
    name,
    buttonLabel: 'Edit'
  };
  return <TaskForm {...propsObject} onButtonClick={edit} />;
}

EditTaskForm.propTypes = {
  taskId: PropTypes.string,
  setIsEditing: PropTypes.func
};

export default EditTaskForm;
