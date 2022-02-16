import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import AppRoutes from './AppRoutes';

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
