import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token'); // Check if the token exists

    if (!token) {
        return <Navigate to="/login" />; // Redirect to login page if no token
    }

    return children; // Render the protected component if token exists
};

export default ProtectedRoute;
