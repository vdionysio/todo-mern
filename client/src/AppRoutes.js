import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeUser from './pages/HomeUser';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/user" element={<HomeUser />} />
      <Route path="/register" element={<Register />} />
      <Route exact path="/" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
