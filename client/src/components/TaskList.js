import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import TaskCard from './TaskCard';

function TaskList() {
  const { tasks } = useContext(UserContext);
  return (
    <Row xs={1} md={2} className="g-2">
      {tasks &&
        Array.from(tasks).map((task, idx) => (
          <Col key={`task-${idx}`}>
            <TaskCard task={task} />
          </Col>
        ))}
    </Row>
  );
}

export default TaskList;
