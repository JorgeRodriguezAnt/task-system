import React from 'react';
import { Navigate } from 'react-router';

// eslint-disable-next-line no-unused-vars
const Protected = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Verifica si el token de acceso está en localStorage

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default Protected;