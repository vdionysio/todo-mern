import React, { useCallback, useContext, useState } from 'react';
import { addTask } from '../api/requests';
import UserContext from '../context/UserContext';
import TaskForm from './TaskForm';

function NewTaskForm() {
  const { token, setShouldUpdateList } = useContext(UserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const createNewTask = useCallback(() => {
    console.log(name, description, status);
    addTask({ name, description, status }, token)
      .then((response) => {
        setShouldUpdateList((prev) => !prev);
        console.log(response);
        return true;
      })
      .catch((err) => {
        console.log(err.response.data);
        return false;
      });
  }, [status, name]);

  const propsObject = {
    setDescription,
    setName,
    setStatus,
    status,
    name,
    buttonLabel: 'Create task'
  };
  return <TaskForm {...propsObject} onButtonClick={createNewTask} />;
}

export default NewTaskForm;
