import React, { useCallback, useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { register } from '../api/requests';
// import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { validateEmail } from '../helpers';

function RegisterForm() {
  // const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [error, setError] = useState();
  const { setToken } = useContext(UserContext);

  const registerUser = useCallback(
    async (registerInputs) => {
      const fields = [email, displayName, password, checkPassword];
      const isSomeNull = fields.some((field) => field === '');
      console.log(isSomeNull);
      if (isSomeNull) {
        setError('All fields must be filled');
        return false;
      } else if (password !== checkPassword) {
        setError('Wrong password on confirmation field');
        return false;
      } else if (!validateEmail(email)) {
        setError('Invalid email');
        return false;
      }
      const data = await register(registerInputs);
      setToken(data.token);
      setError(data.message);
    },
    [email, password, checkPassword, displayName]
  );

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Display name</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter display name"
          onBlur={({ target }) => setDisplayName(target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onBlur={({ target }) => setEmail(target.value)}
        />
        <Form.Text className="text-muted">
          We will never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onBlur={({ target }) => setPassword(target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm your Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onBlur={({ target }) => setCheckPassword(target.value)}
        />
      </Form.Group>
      <Alert variant="danger" style={!error ? { visibility: 'hidden' } : { visibility: 'visible' }}>
        {error || 'Keep space'}
      </Alert>
      <Button
        variant="primary"
        type="button"
        onClick={() => registerUser({ displayName, email, password })}>
        Register
      </Button>
    </Form>
  );
}

export default RegisterForm;
