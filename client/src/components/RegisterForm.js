import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { validateEmail, validateLength } from '../helpers';
import CheckPasswordInput from './inputs/CheckPasswordInput';
import DisplayNameInput from './inputs/DisplayNameInput';
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
      <DisplayNameInput displayName={displayName} setDisplayName={setDisplayName} />
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
      <CheckPasswordInput
        password={password}
        setCheckPassword={setCheckPassword}
        checkPassword={checkPassword}
      />
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
