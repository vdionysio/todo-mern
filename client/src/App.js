import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import AppRoutes from './AppRoutes';
import './styles/Main.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
