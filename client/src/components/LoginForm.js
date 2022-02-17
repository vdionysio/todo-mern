import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { validateEmail, validateLength } from '../helpers';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const { login } = useContext(UserContext);

  useEffect(() => {
    if (validateEmail(email) && validateLength(password, 6)) {
      setIsReady(true);
    }
  }, [email, password]);

  return (
    <form>
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
      <button disabled={!isReady} type="button" onClick={() => login({ email, password })}>
        Enter
      </button>
    </form>
  );
}

export default LoginForm;
