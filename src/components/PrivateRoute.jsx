import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, checkAuth } = useAuth(); // Assuming you have a checkAuth method
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await checkAuth(); // Check auth status from backend
      } finally {
        setLoading(false);
      }
    };
    
    verifyUser();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
