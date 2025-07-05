import { jwtDecode } from 'jwt-decode';

// Store token in localStorage
export const login = (token) => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
export const logout = () => {
  localStorage.removeItem('token');
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get user role from decoded token
export const getUserRole = () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error('Invalid token:', error);
    logout(); // Clear invalid token
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      logout(); // Clear expired token
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
