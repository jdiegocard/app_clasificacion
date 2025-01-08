import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const { exp } = jwtDecode(token); // Obtener la fecha de expiración
        return Date.now() < exp * 1000; // Validar si el token aún es válido
    } catch (error) {
        return false;
    }
};

const PrivateRoute = ({ children }) => {
    return isTokenValid() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
