// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function RegisterPage() {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         ...form,
//         role: 'customer', // always customer from UI
//       });
//       navigate('/login');
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         alert('You already have a login ID with this username.');
//       } else {
//         alert('Registration failed. Please try again.');
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Register as Customer</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="username" onChange={handleChange} placeholder="Username" required /><br />
//         <input name="password" type="password" onChange={handleChange} placeholder="Password" required /><br />
//         <button type="submit">Register</button>
//       </form>
//       <button onClick={() => navigate('/login')}>Login</button>
//     </div>
//   );
// }

// export default RegisterPage;























// RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, notification } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        ...form,
        role: 'customer', // always customer from UI
      });
      notification.success({
        message: 'Registration Successful',
        description: 'You have registered successfully! You can now log in.',
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        notification.error({
          message: 'Username Already Exists',
          description: 'You already have a login ID with this username.',
        });
      } else {
        notification.error({
          message: 'Registration Failed',
          description: 'Registration failed. Please try again.',
        });
        console.error(error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <Card title="Register as Customer" style={{ maxWidth: 400, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div className="mb-3">
            <Input.Password
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              style={{ width: '100%' }}
            />
          </div>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </form>

        <div className="mt-3 text-center">
          <Button type="link" onClick={() => navigate('/login')}>
            Already have an account? Log in
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
