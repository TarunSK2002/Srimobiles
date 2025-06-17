// // utils/auth.js
// import axios from 'axios';

// export const login = async (username, password) => {
//   try {
//     const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
//     const user = res.data.user;
//     console.log('Logged in user:', user); // For debugging, to verify the structure of the user object
//     localStorage.setItem('user', JSON.stringify(user));
//     return user;
//   } catch (err) {
//     alert('Login failed');
//     return null;
//   }
// };

// export const logout = () => {
//   localStorage.removeItem('user');
// };

// export const getUserRole = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   return user?.role || null;
// };
    


import axios from 'axios';

// Login function
export const login = async (username, password) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      username,
      password,
    });

    // Use response data directly or with a `user` property depending on backend
    const user = res.data.user || res.data;
    console.log('Logged in user:', user);

    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (err) {
    console.error('Login failed:', err.response?.data?.error || err.message);
    alert('Login failed: ' + (err.response?.data?.error || 'Server error'));
    return null;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('user');
};

// Get user role
export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role || null;
};

// Get full user object
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};



