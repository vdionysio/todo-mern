import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import UserContext from '../context/UserContext';

function Main() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (token) navigate('/user');
  }, [token]);

  return (
    <div className="main-container">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default Main;
