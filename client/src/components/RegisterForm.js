import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { validateEmail, validateLength } from '../helpers';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';

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
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
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
