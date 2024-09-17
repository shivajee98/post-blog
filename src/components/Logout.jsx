// src/components/LogoutButton.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
