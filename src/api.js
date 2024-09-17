// src/api.js
import Cookies from 'js-cookie';

const api = async (url, options = {}) => {
  const accessToken = Cookies.get('accessToken');

  const defaultOptions = {
    credentials: 'include', // Automatically include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (accessToken) {
    defaultOptions.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
};

export default api;
