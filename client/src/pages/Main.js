import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function Main() {
  return (
    <div className="main-container">
      <div className="forms-container">
        <div className="login-container">
          <LoginForm />
        </div>
        <div className="register-container">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Main;
