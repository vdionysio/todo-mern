import React, { useCallback, useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import UserContext from '../context/UserContext';

const sortAux = (valueA, valueB) => {
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

function FilterBox() {
  const { setTasks, tasks } = useContext(UserContext);
  const [sortSettings, setSortSettings] = useState({ column: 'createdAt', ord: 'DESC' });
  const sortTasks = useCallback(() => {
    const { column, ord } = sortSettings;
    const filtered = [...tasks].sort((a, b) => {
      var valueA = a[column].toUpperCase();
      var valueB = b[column].toUpperCase();
      return sortAux(valueA, valueB);
    });
    if (ord === 'DESC') setTasks(filtered.reverse());
    setTasks(filtered);
  }, [tasks, sortSettings]);

  return (
    <Form>
      <Form.Group>
        <Form.Label>Order by</Form.Label>
        <Form.Select onChange={({ target }) => setSortSettings(JSON.parse(target.value))}>
          <option value={JSON.stringify({ column: 'createdAt', ord: 'DESC' })}>Newest</option>
          <option value={JSON.stringify({ column: 'createdAt', ord: 'ASC' })}>Older</option>
          <option value={JSON.stringify({ column: 'name', ord: 'ASC' })}>Name (A - Z)</option>
          <option value={JSON.stringify({ column: 'name', ord: 'DESC' })}>Name (Z - A)</option>
          <option value={JSON.stringify({ column: 'description', ord: 'ASC' })}>
            Description (A - Z)
          </option>
          <option value={JSON.stringify({ column: 'description', ord: 'DESC' })}>
            Description (Z - A)
          </option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="button" onClick={sortTasks}>
        Sort
      </Button>
    </Form>
  );
}

export default FilterBox;
