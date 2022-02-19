import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

function TaskForm({
  setDescription,
  setName,
  setStatus,
  onButtonClick,
  status,
  name,
  description,
  buttonLabel
}) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Task name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a task name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Task description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a description"
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Check
          type="radio"
          label="pending"
          value="pending"
          name="status"
          checked={status === 'pending'}
          onChange={({ target: { value } }) => setStatus(value)}
        />
        <Form.Check
          type="radio"
          label="open"
          value="open"
          name="status"
          checked={status === 'open'}
          onChange={({ target: { value } }) => setStatus(value)}
        />
        <Form.Check
          type="radio"
          label="closed"
          value="closed"
          name="status"
          checked={status === 'closed'}
          onChange={({ target: { value } }) => setStatus(value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="button"
        onClick={onButtonClick}
        disabled={status === '' || name === '' || description === ''}>
        {buttonLabel}
      </Button>
    </Form>
  );
}

TaskForm.propTypes = {
  setDescription: PropTypes.func,
  setStatus: PropTypes.func,
  setName: PropTypes.func,
  onButtonClick: PropTypes.func,
  status: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  buttonLabel: PropTypes.string
};

export default TaskForm;
