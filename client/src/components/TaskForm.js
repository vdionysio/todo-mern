import React from 'react';
import PropTypes from 'prop-types';

function TaskForm({
  setDescription,
  setName,
  setStatus,
  onButtonClick,
  status,
  name,
  buttonLabel
}) {
  return (
    <div>
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
      <button
        className="btn-edit"
        type="button"
        disabled={!(status && name)}
        onClick={onButtonClick}>
        {buttonLabel}
      </button>
    </div>
  );
}

TaskForm.propTypes = {
  setDescription: PropTypes.func,
  setStatus: PropTypes.func,
  setName: PropTypes.func,
  onButtonClick: PropTypes.func,
  status: PropTypes.string,
  name: PropTypes.string,
  buttonLabel: PropTypes.string
};

export default TaskForm;
