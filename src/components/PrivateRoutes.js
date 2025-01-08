import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Obtener el token

    if (!token) {
        return <Navigate to="/login" />; // Redirigir al login
    }

    return children;
};

export default PrivateRoute;
