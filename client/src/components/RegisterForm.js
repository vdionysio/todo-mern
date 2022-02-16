import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { validateEmail, validateLength } from '../helpers';

function RegisterForm() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [dataIsReady, setDataIsReady] = useState(false);
  const { registerUser, token } = useContext(UserContext);
  const generalCheck = useCallback(() => {
    const checkArray = [
      validateLength(displayName, 6),
      validateEmail(email),
      validateLength(password, 6),
      checkPassword === password
    ];
    setDataIsReady(checkArray.every((check) => check));
  }, [displayName, email, password, checkPassword]);

  useEffect(() => {
    generalCheck();
  }, [checkPassword]);

  useEffect(() => {
    if (token) navigate('/user');
  }, [token]);

  return (
    <form>
      <label htmlFor="display-name">
        Display name
        {displayName != '' && !validateLength(displayName, 6) && <span>Invalid</span>}
        <input
          className="input-text"
          type="text"
          onBlur={({ target: { value } }) => setDisplayName(value)}
          name="display-name"
        />
      </label>
      <label>
        {email != '' && !validateEmail(email) && <span>Invalid</span>}
        Email
        <input
          className="input-text"
          type="email"
          onBlur={({ target: { value } }) => setEmail(value)}
          name="email"
        />
      </label>
      <label>
        {password != '' && !validateLength(password, 6) && <span>Invalid</span>}
        Password
        {<span></span>}
        <input
          className="input-text"
          type="password"
          onBlur={({ target: { value } }) => setPassword(value)}
          name="password"
        />
      </label>
      <label>
        {checkPassword != '' && checkPassword != password && <span>Invalid</span>}
        Confirm Password
        <input
          className="input-text"
          type="password"
          onBlur={({ target: { value } }) => setCheckPassword(value)}
          name="check-password"
        />
      </label>
      <button
        onClick={async () => {
          registerUser({ displayName, email, password });
        }}
        type="button"
        disabled={!dataIsReady}>
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
