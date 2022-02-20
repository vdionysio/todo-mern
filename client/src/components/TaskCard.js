import React, { useCallback, useContext } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { removeTask } from '../api/requests';
import UserContext from '../context/UserContext';

const convertToLocalTimeStamp = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

function TaskCard({ task }) {
  const { token, setTasks } = useContext(UserContext);
  const remove = useCallback(async () => {
    const result = await removeTask(token, task._id);
    console.log(result);
    if (result.task) {
      setTasks((prev) => {
        const index = prev.map((item) => item._id).indexOf(task._id);
        if (index > -1) {
          return prev.splice(index, 1); // 2nd parameter means remove one item only
        }
        return prev;
      });
    }
    console.log(result);
  }, [task]);

  return (
    <Card className="border" style={{ position: 'relative', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {`${task.status} - created at ${convertToLocalTimeStamp(task.createdAt)}`}
        </Card.Subtitle>
        <Card.Text>{task.description}</Card.Text>
      </Card.Body>
      <p>{task._id}</p>
      <MdDeleteForever
        onClick={remove}
        title="Remove Task"
        style={{ position: 'absolute', top: '0', right: '5', fontSize: '25', cursor: 'pointer' }}
      />
      <MdEdit
        title="Edit Task"
        style={{ position: 'absolute', top: '0', right: '30', fontSize: '25', cursor: 'pointer' }}
      />
    </Card>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    createdAt: PropTypes.string,
    _id: PropTypes.string
  })
};

export default TaskCard;
