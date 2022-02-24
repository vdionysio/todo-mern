import React, { useCallback, useContext, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { addTask } from '../api/requests';
import UserContext from '../context/UserContext';
import TaskForm from './TaskForm';

function NewTaskForm() {
  const { token, setTasks } = useContext(UserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createNewTask = useCallback(async () => {
    setIsLoading(true);
    const result = await addTask({ name, description, status }, token);
    setIsLoading(false);
    if (result.task) {
      setTasks((prevState) => [result.task, ...prevState]);
    } else {
      alert(result.message);
    }
    setName('');
    setDescription('');
    setStatus('');
  }, [status, name, description]);

  const propsObject = {
    setDescription,
    setName,
    setStatus,
    status,
    description,
    name,
    buttonLabel: 'Create task',
    variant: 'success'
  };
  return (
    <LoadingOverlay
      spinner
      active={isLoading}
      styles={{
        overlay: (base) => ({
          ...base,
          background: 'rgba(255, 255, 255, 0.5)'
        }),
        spinner: (base) => ({
          ...base,
          width: '100px',
          '& svg circle': {
            stroke: 'rgba(0, 0, 0, 0.5)'
          }
        })
      }}>
      <TaskForm {...propsObject} onButtonClick={createNewTask} />
    </LoadingOverlay>
  );
}

export default NewTaskForm;
