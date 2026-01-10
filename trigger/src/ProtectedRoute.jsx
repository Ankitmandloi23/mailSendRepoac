import React from 'react';
import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    // console.log("Checking authentication status");
    // console.log("Auth Token:", localStorage.getItem('authToken'));

    return Boolean(localStorage.getItem('authToken'));
}

const ProtectedRoute = ({ children }) => {
    // console.log("ProtectedRoute rendered");
   
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;