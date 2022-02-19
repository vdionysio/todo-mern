import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const convertToLocalTimeStamp = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

function TaskCard({ task }) {
  return (
    <Card className="border">
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {`${task.status} - created at ${convertToLocalTimeStamp(task.createdAt)}`}
        </Card.Subtitle>
        <Card.Text>{task.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    createdAt: PropTypes.string
  })
};

export default TaskCard;
