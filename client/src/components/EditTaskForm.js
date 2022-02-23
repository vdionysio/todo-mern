import React, { useCallback, useContext, useState } from 'react';
import { editTask } from '../api/requests';
import UserContext from '../context/UserContext';
import TaskForm from './TaskForm';

function EditTaskForm() {
  const { editingTask, setEditingTask, token, setTasks } = useContext(UserContext);
  const [name, setName] = useState(editingTask.name);
  const [description, setDescription] = useState(editingTask.description);
  const [status, setStatus] = useState(editingTask.status);
  const edit = useCallback(async () => {
    const result = await editTask({ name, description, status }, token, editingTask._id);
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
  return <TaskForm {...propsObject} onButtonClick={edit} />;
}

export default EditTaskForm;
