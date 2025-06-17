// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
//     setCartItems(cart);
//   }, []);

//   const handleRemoveItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     sessionStorage.setItem('cart', JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//   };

//   const handleProceedToCheckout = () => {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     if (!user) {
//       alert('Please login first.');
//       navigate('/login');
//       return;
//     }

//     sessionStorage.setItem('checkoutItems', JSON.stringify(cartItems));
//     navigate('/checkout');
//   };

//   const handleBuyItem = (item) => {
//     sessionStorage.setItem('buyItem', JSON.stringify(item));
//     navigate('/buy-now');
//   };

//   const calculateGrandTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={{ padding: 20 }}>
//         <h2>🛒 Shopping Cart</h2>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             {cartItems.map((item, index) => (
//               <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 15, borderRadius: 8 }}>
//                 <h3>{item.name}</h3>
//                 <p>Quantity: {item.quantity} {item.unit}</p>
//                 <p>Price: ₹{item.totalPrice.toFixed(2)}</p>
//                 <button onClick={() => handleRemoveItem(index)} style={removeBtnStyle}>Remove</button>
//                 <button onClick={() => handleBuyItem(item)} style={buyBtnStyle}>Buy Now</button>
//               </div>
//             ))}
//             <h3 style={{ marginTop: 30 }}>Grand Total: ₹{calculateGrandTotal()}</h3>
//             <button onClick={handleProceedToCheckout} style={checkoutBtnStyle}>Proceed to Checkout</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const removeBtnStyle = {
//   backgroundColor: 'red',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   cursor: 'pointer'
// };

// const buyBtnStyle = {
//   backgroundColor: '#27ae60',
//   color: 'white',
//   border: 'none',
//   padding: '6px 12px',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   marginLeft: '10px'
// };

// const checkoutBtnStyle = {
//   marginTop: '20px',
//   padding: '10px 20px',
//   backgroundColor: '#27ae60',
//   color: 'white',
//   fontSize: '16px',
//   border: 'none',
//   borderRadius: '6px',
//   cursor: 'pointer'
// };

// export default CartPage;






















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
// import { Button, Row, Col, Card, Modal, Spin } from 'antd'; // Ant Design components
// import { Container } from 'react-bootstrap'; // Bootstrap component

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, _setLoading] = useState(false); // Added loading state

//   useEffect(() => {
//     const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
//     setCartItems(cart);
//   }, []);

//   const handleRemoveItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     sessionStorage.setItem('cart', JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//   };

//   const handleProceedToCheckout = () => {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     if (!user) {
//       alert('Please login first.');
//       navigate('/login');
//       return;
//     }

//     sessionStorage.setItem('checkoutItems', JSON.stringify(cartItems));
//     navigate('/checkout');
//   };

//   const handleBuyItem = (item) => {
//     sessionStorage.setItem('buyItem', JSON.stringify(item));
//     navigate('/buy-now');
//   };

//   const calculateGrandTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);
//   };

//   return (
//     <div>
//       <Navbar />
//       <Container className="py-5">
//         <h2 className="text-center">🛒 Shopping Cart</h2>
//         {cartItems.length === 0 ? (
//           <div className="text-center">
//             <p>Your cart is empty.</p>
//             <Button type="primary" onClick={() => navigate('/')} size="large">
//               Back to Shop
//             </Button>
//           </div>
//         ) : (
//           <Row gutter={[16, 16]}>
//             {cartItems.map((item, index) => (
//               <Col xs={24} sm={12} md={8} key={index}>
//                 <Card
//                   title={item.name}
//                   bordered={false}
//                   style={{ width: '100%' }}
//                   actions={[
//                     <Button
//                       type="danger"
//                       onClick={() => handleRemoveItem(index)}
//                       style={{ width: '100%' }}
//                     >
//                       Remove
//                     </Button>,
//                     <Button
//                       type="primary"
//                       onClick={() => handleBuyItem(item)}
//                       style={{ width: '100%' }}
//                     >
//                       Buy Now
//                     </Button>,
//                   ]}
//                 >
//                   <p>Quantity: {item.quantity} {item.unit}</p>
//                   <p>Price: ₹{item.totalPrice.toFixed(2)}</p>
//                 </Card>
//               </Col>
//             ))}
//             <Col span={24}>
//               <h3 className="text-right mt-3">
//                 Grand Total: ₹{calculateGrandTotal()}
//               </h3>
//               <Button
//                 type="primary"
//                 onClick={handleProceedToCheckout}
//                 style={{ width: '100%', marginTop: 20 }}
//                 size="large"
//                 loading={loading}
//                 disabled={loading}
//               >
//                 {loading ? <Spin /> : 'Proceed to Checkout'}
//               </Button>
//             </Col>
//           </Row>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default CartPage;


























import React from 'react';
// import Header from "../../components/Header";
import Navbar from '../../components/Navbar';

import Footer from '../../components/Footer';
import { Table, Button } from 'antd';

const CartPage = () => {
  const columns = [
    { title: 'Product', dataIndex: 'product' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Quantity', dataIndex: 'quantity' },
    {
      title: 'Action',
      render: () => <Button type="link" danger>Remove</Button>,
    },
  ];

  const data = [
    { key: '1', product: 'iPhone 14', price: '₹79,999', quantity: 1 },
  ];

  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <div className="container mt-4">
        <h3>My Cart</h3>
        <Table columns={columns} dataSource={data} />
        <div className="text-end">
          <Button type="primary">Proceed to Checkout</Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;