import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByToken } from '../api/requests';
import LoginForm from '../components/LoginForm';
import UserContext from '../context/UserContext';

function Main() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const result = await getUserByToken(token);
      if (!result.message) navigate('/user');
    };
    checkToken();
  }, [token]);

  return (
    <div className="login-container">
      <LoginForm />
    </div>
  );
}

export default Main;
