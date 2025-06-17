import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/auth';
import { Input, Button, Form, Space, Card } from 'antd';  // Ant Design components
import { Container } from 'react-bootstrap';  // Bootstrap component

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Clear sessionStorage when the page loads
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.username, form.password);

    if (result) {
      // Save user to sessionStorage
      sessionStorage.setItem('user', JSON.stringify(result));

      // Handle pending cart or buy item after login
      const pendingCartItem = sessionStorage.getItem('pendingCartItem');
      const pendingBuyItem = sessionStorage.getItem('pendingBuyItem');

      if (pendingCartItem) {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        cart.push(JSON.parse(pendingCartItem));
        sessionStorage.setItem('cart', JSON.stringify(cart));
        sessionStorage.removeItem('pendingCartItem');
        navigate('/cart');
      } else if (pendingBuyItem) {
        sessionStorage.setItem('buyItem', pendingBuyItem);
        sessionStorage.removeItem('pendingBuyItem');
        navigate('/buy-now');
      } else {
        // Default redirection based on role
        if (result.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card title="Login" style={{ width: '400px', padding: '20px' }}>
        <Form onSubmitCapture={handleSubmit}>
          <Form.Item label="Username">
            <Input
              name="username"
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
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
