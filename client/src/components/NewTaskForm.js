import React, { useCallback, useContext, useState } from 'react';
import { addTask } from '../api/requests';
import UserContext from '../context/UserContext';
import TaskForm from './TaskForm';

function NewTaskForm() {
  const { token, setTasks } = useContext(UserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const createNewTask = useCallback(async () => {
    console.log(name, description, status);
    const result = await addTask({ name, description, status }, token);
    if (result.task) {
      setTasks((prevState) => [...prevState, result.task]);
    } else {
      alert(result.message);
    }
  }, [status, name, description]);

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
