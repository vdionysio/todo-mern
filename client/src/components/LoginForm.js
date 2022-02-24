import React, { useCallback, useContext, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import UserContext from '../context/UserContext';
import { validateEmail, validateLength } from '../helpers';
import { Alert, Button, Form } from 'react-bootstrap';
import { loginAuthentication } from '../api/requests';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(UserContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const login = useCallback(async (loginInputs) => {
    if (validateEmail(email) && validateLength(password, 6)) {
      setError('Invalid username or password');
      return false;
    }
    setIsLoading(true);
    const data = await loginAuthentication(loginInputs);
    setIsLoading(false);
    setToken(data.token);
    setError(data.message);
  }, []);

  return (
    <LoadingOverlay
      spinner
      active={isLoading}
      styles={{
        overlay: (base) => ({
          ...base,
          background: 'rgba(255, 255, 255, 0.5)'
        }),
        spinner: (base) => ({
          ...base,
          width: '100px',
          '& svg circle': {
            stroke: 'rgba(0, 0, 0, 0.5)'
          }
        })
      }}>
      <Form>
        <h2>To Do List</h2>
        <Form.Group className="mb-3">
          <h5>Enter with your account</h5>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onBlur={({ target }) => setEmail(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onBlur={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Alert
          variant="danger"
          style={!error ? { visibility: 'hidden' } : { visibility: 'visible' }}>
          {error || 'Keep space'}
        </Alert>
        <div className="login-btn-container">
          <Button variant="primary" type="button" onClick={() => login({ email, password })}>
            Login
          </Button>
          <Button variant="outline-primary" type="button" onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      </Form>
    </LoadingOverlay>
  );
}

export default LoginForm;
