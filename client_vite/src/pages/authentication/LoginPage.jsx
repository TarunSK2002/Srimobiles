import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getUserRole } from '../../utils/auth';
import { Input, Button, Form, Card, message } from 'antd';
import { Container } from 'react-bootstrap';

function LoginPage() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token); // Store the token
        message.success('Login successful!');

        const role = getUserRole();
        console.log(role,response.data,"this is from login");
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        message.error(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card title="Login" style={{ width: 400 }}>
        <Form name="login" onFinish={onFinish} layout="vertical" autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center">
          New here?{' '}
          <Button type="link" onClick={() => navigate('/register')}>
            Register
          </Button>
        </p>
      </Card>
    </Container>
  );
}

export default LoginPage;












// // pages/LoginPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../../utils/auth';
// import { Input, Button, Form, Card } from 'antd';
// import { Container } from 'react-bootstrap';

// function LoginPage() {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const navigate = useNavigate();

//   useEffect(() => {
//     sessionStorage.clear();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Logging in:", form.username);
//     const result = await login(form.username, form.password);
//     console.log("Login result:", result);

//     if (result) {
//       sessionStorage.setItem('user', JSON.stringify(result));

//       const pendingCartItem = sessionStorage.getItem('pendingCartItem');
//       const pendingBuyItem = sessionStorage.getItem('pendingBuyItem');

//       if (pendingCartItem) {
//         const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
//         cart.push(JSON.parse(pendingCartItem));
//         sessionStorage.setItem('cart', JSON.stringify(cart));
//         sessionStorage.removeItem('pendingCartItem');
//         navigate('/cart');
//       } else if (pendingBuyItem) {
//         sessionStorage.setItem('buyItem', pendingBuyItem);
//         sessionStorage.removeItem('pendingBuyItem');
//         navigate('/buy-now');
//       } else {
//         result.role === 'admin' ? navigate('/admin') : navigate('/');
//       }
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <Card title="Login" style={{ width: 400 }}>
//         <Form onSubmitCapture={handleSubmit}>
//           <Form.Item label="Username">
//             <Input
//               name="username"
//               onChange={handleChange}
//               placeholder="Username"
//               required
//             />
//           </Form.Item>
//           <Form.Item label="Password">
//             <Input.Password
//               name="password"
//               onChange={handleChange}
//               placeholder="Password"
//               required
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//         <p className="text-center">
//           New here? <Button type="link" onClick={() => navigate('/register')}>Register</Button>
//         </p>
//       </Card>
//     </Container>
//   );
// }

// export default LoginPage;
