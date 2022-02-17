import React, { useState } from 'react';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form>
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
    </form>
  );
}

export default LoginForm;
