// utils/auth.js
import axios from 'axios';

export const login = async (username, password) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    const user = res.data.user;
    console.log('Logged in user:', user); // For debugging, to verify the structure of the user object
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (err) {
    alert('Login failed');
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role || null;
};
    



