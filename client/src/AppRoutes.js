import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeUser from './pages/HomeUser';
import Main from './pages/Main';
import NotFound from './pages/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/user" element={<HomeUser />} />
      <Route exact path="/" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
