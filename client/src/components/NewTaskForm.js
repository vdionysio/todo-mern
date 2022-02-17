import React, { useCallback, useContext, useState } from 'react';
import { addTask } from '../api/requests';
import UserContext from '../context/UserContext';

function NewTaskForm() {
  const { token, setShouldUpdateList } = useContext(UserContext);
  const [name, setName] = useState();
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState();

  const createNewTask = useCallback(() => {
    addTask({ name, description, status }, token)
      .then((response) => {
        setShouldUpdateList((prev) => !prev);
        console.log(response);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }, [status, name]);

  return (
    <form>
      <label htmlFor="name">
        <input type="text" name="name" onChange={({ target: { value } }) => setName(value)} />
      </label>
      <label htmlFor="description">
        <input
          type="text"
          name="description"
          onChange={({ target: { value } }) => setDescription(value)}
        />
      </label>
      <label htmlFor="status">
        Open
        <input
          type="radio"
          name="status"
          value="open"
          onClick={({ target: { value } }) => setStatus(value)}
        />
        Closed
        <input
          type="radio"
          name="status"
          value="closed"
          onClick={({ target: { value } }) => setStatus(value)}
        />
        Pending
        <input
          type="radio"
          name="status"
          value="peding"
          onClick={({ target: { value } }) => setStatus(value)}
        />
      </label>
      <button type="button" disabled={!(status && name)} onClick={createNewTask}>
        Add
      </button>
    </form>
  );
}

export default NewTaskForm;
