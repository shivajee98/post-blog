// src/components/Login.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Cookies from 'js-cookie'; // Import js-cookie


const Login = () => {
  const { login } = useAuth();
  console.log('All Cookies:', Cookies.get());

  useEffect(() => {
    // Simulate login after OAuth redirection
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      login(JSON.parse(storedUser));
    }
  }, [login]);

  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  return (
    <div className="login">
      <h2>Please login to access the dashboard</h2>
      <button onClick={handleLogin} className="btn btn-primary">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
