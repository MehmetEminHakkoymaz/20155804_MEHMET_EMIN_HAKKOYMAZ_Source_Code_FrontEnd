import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && user.role !== 'Admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;