import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { getUserByToken, register } from '../api/requests';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { validateEmail } from '../helpers';

function RegisterForm() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [error, setError] = useState();
  const { setToken, token } = useContext(UserContext);

  const registerUser = useCallback(
    async (registerInputs) => {
      const fields = [email, displayName, password, checkPassword];
      const isSomeNull = fields.some((field) => field === '');
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

  useEffect(() => {
    const checkToken = async () => {
      const result = await getUserByToken(token);
      if (!result.message) navigate('/user');
    };
    checkToken();
  }, [token]);

  return (
    <Form>
      <Form.Group className="mb-3">
        <h5>Register now</h5>
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
      <Alert
        className="alert"
        variant="danger"
        style={!error ? { visibility: 'hidden' } : { visibility: 'visible' }}>
        {error || 'Keep space'}
      </Alert>
      <div className="register-btn-container">
        <Button
          variant="primary"
          type="button"
          onClick={() => registerUser({ displayName, email, password })}>
          Register
        </Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
