import React, { useCallback, useContext, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { editTask } from '../api/requests';
import UserContext from '../context/UserContext';
import TaskForm from './TaskForm';

function EditTaskForm() {
  const { editingTask, setEditingTask, token, setTasks } = useContext(UserContext);
  const [name, setName] = useState(editingTask.name);
  const [description, setDescription] = useState(editingTask.description);
  const [status, setStatus] = useState(editingTask.status);
  const [isLoading, setIsLoading] = useState(false);
  const edit = useCallback(async () => {
    setIsLoading(true);
    const result = await editTask({ name, description, status }, token, editingTask._id);
    setIsLoading(false);
    if (result.task) {
      setTasks((prev) =>
        prev.map((item) => {
          if (item._id === editingTask._id) return result.task;
          return item;
        })
      );
      setEditingTask();
    } else {
      alert(result.message);
    }
  }, [name, description, status]);

  const propsObject = {
    setName,
    setDescription,
    setStatus,
    name,
    description,
    status,
    buttonLabel: 'Save editions'
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
      <TaskForm {...propsObject} onButtonClick={edit} />
    </LoadingOverlay>
  );
}

export default EditTaskForm;
