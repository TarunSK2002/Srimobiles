// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';

// const BuyNowPage = () => {
//   const navigate = useNavigate();
//   const item = JSON.parse(sessionStorage.getItem('buyItem'));
//   const totalPrice = JSON.parse(sessionStorage.getItem('totalPrice')); // Get the totalPrice from sessionStorage
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [loading, setLoading] = useState(false); // Added loading state

//   const handleCheckout = async () => {
//     if (!item || !item.quantity || item.quantity <= 0) {
//       alert("Invalid quantity. Please update the item in your cart.");
//       navigate('/cart');
//       return;
//     }

//     try {
//       setLoading(true); // Set loading state
//       const user = JSON.parse(sessionStorage.getItem('user'));

//       if (!user) {
//         alert('Please login to place the order.');
//         navigate('/login');
//         return;
//       }

//       await axios.post('http://localhost:5000/api/order/place-order', {
//         items: [item],
//         userId: user?.id, // Optionally include user ID if needed
//       });

//       sessionStorage.removeItem('buyItem');
//       sessionStorage.removeItem('totalPrice'); // Remove totalPrice after placing the order
//       setOrderPlaced(true);

//       setTimeout(() => {
//         navigate('/'); // Redirect after 3 seconds
//       }, 3000); 
//     } catch (err) {
//       console.error(err);
//       alert('❌ Failed to place order.');
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   const handleRemove = () => {
//     sessionStorage.removeItem('buyItem');
//     sessionStorage.removeItem('totalPrice'); // Remove totalPrice on removal
//     alert('Item removed from purchase');
//     navigate('/');
//   };

//   if (!item && !orderPlaced) {
//     return (
//       <div>
//         <Navbar />
//         <div style={{ padding: 20, textAlign: 'center' }}>
//           <h2>❗ No item selected for purchase.</h2>
//           <p>Return to the shop and grab something delicious.</p>
//           <button onClick={() => navigate('/')} style={btnStyle}>Back to Shop</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div style={{ padding: 20, textAlign: 'center' }}>
//         {orderPlaced ? (
//           <div>
//             <h2>✅ Order Placed Successfully!</h2>
//             <img
//               src="/order-success.png" // Make sure this image exists in your public folder
//               alt="Order Success"
//               style={{ maxWidth: '300px', marginTop: 20 }}
//             />
//             <p>Redirecting to homepage...</p>
//           </div>
//         ) : (
//           <>
//             <h2>🛒 Confirm Purchase</h2>
//             <p><strong>Product:</strong> {item.name}</p>
//             <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
//             <p><strong>Total:</strong> ₹{item.totalPrice ? item.totalPrice : '0.00'}</p> {/* Display totalPrice */}

//             <button onClick={handleCheckout} style={btnStyle} disabled={loading}>
//               {loading ? 'Processing...' : 'Checkout'}
//             </button>
//             <button onClick={handleRemove} style={{ ...btnStyle, backgroundColor: 'red', marginLeft: 10 }}>
//               Remove
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const btnStyle = {
//   padding: '10px 16px',
//   backgroundColor: '#2980b9',
//   color: 'white',
//   border: 'none',
//   borderRadius: '6px',
//   cursor: 'pointer',
//   fontSize: '16px'
// };

// export default BuyNowPage;



















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { Button, Alert, Spin, Modal } from 'antd';  // Ant Design components
// import { Container, Row, Col } from 'react-bootstrap'; // Bootstrap components

// const BuyNowPage = () => {
//   const navigate = useNavigate();
//   const item = JSON.parse(sessionStorage.getItem('buyItem'));
//   const totalPrice = JSON.parse(sessionStorage.getItem('totalPrice')); // Get the totalPrice from sessionStorage
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [loading, setLoading] = useState(false); // Added loading state

//   const handleCheckout = async () => {
//     if (!item || !item.quantity || item.quantity <= 0) {
//       alert("Invalid quantity. Please update the item in your cart.");
//       navigate('/cart');
//       return;
//     }

//     try {
//       setLoading(true); // Set loading state
//       const user = JSON.parse(sessionStorage.getItem('user'));

//       if (!user) {
//         alert('Please login to place the order.');
//         navigate('/login');
//         return;
//       }

//       await axios.post('http://localhost:5000/api/order/place-order', {
//         items: [item],
//         userId: user?.id, // Optionally include user ID if needed
//       });

//       sessionStorage.removeItem('buyItem');
//       sessionStorage.removeItem('totalPrice'); // Remove totalPrice after placing the order
//       setOrderPlaced(true);

//       setTimeout(() => {
//         navigate('/'); // Redirect after 3 seconds
//       }, 3000);
//     } catch (err) {
//       console.error(err);
//       alert('❌ Failed to place order.');
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   const handleRemove = () => {
//     sessionStorage.removeItem('buyItem');
//     sessionStorage.removeItem('totalPrice'); // Remove totalPrice on removal
//     alert('Item removed from purchase');
//     navigate('/');
//   };

//   if (!item && !orderPlaced) {
//     return (
//       <div>
//         <Navbar />
//         <Container className="text-center py-5">
//           <h2>❗ No item selected for purchase.</h2>
//           <p>Return to the shop and grab something delicious.</p>
//           <Button type="primary" onClick={() => navigate('/')} style={btnStyle}>Back to Shop</Button>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <Container className="text-center py-5">
//         {orderPlaced ? (
//           <div>
//             <h2>✅ Order Placed Successfully!</h2>
//             <img
//               src="/order-success.png" // Make sure this image exists in your public folder
//               alt="Order Success"
//               style={{ maxWidth: '300px', marginTop: 20 }}
//             />
//             <p>Redirecting to homepage...</p>
//           </div>
//         ) : (
//           <>
//             <h2>🛒 Confirm Purchase</h2>
//             <Row>
//               <Col>
//                 <p><strong>Product:</strong> {item.name}</p>
//                 <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
//                 <p><strong>Total:</strong> ₹{item.totalPrice ? item.totalPrice : '0.00'}</p>
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <Button
//                   type="primary"
//                   onClick={handleCheckout}
//                   style={btnStyle}
//                   loading={loading}
//                   disabled={loading}
//                 >
//                   {loading ? 'Processing...' : 'Checkout'}
//                 </Button>
//                 <Button
//                   type="danger"
//                   onClick={handleRemove}
//                   style={{ ...btnStyle, marginLeft: '10px' }}
//                 >
//                   Remove
//                 </Button>
//               </Col>
//             </Row>
//           </>
//         )}
//       </Container>
//     </div>
//   );
// };

// const btnStyle = {
//   padding: '10px 16px',
//   borderRadius: '6px',
//   fontSize: '16px'
// };

// export default BuyNowPage;











//buynowpage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Button, Alert, Spin, Modal } from 'antd';  // Ant Design components
import { Container, Row, Col } from 'react-bootstrap'; // Bootstrap components

const BuyNowPage = () => {
  const navigate = useNavigate();
  const item = JSON.parse(sessionStorage.getItem('buyItem'));
  const totalPrice = JSON.parse(sessionStorage.getItem('totalPrice')); // Get the totalPrice from sessionStorage
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleCheckout = async () => {
    if (!item || !item.quantity || item.quantity <= 0) {
      alert("Invalid quantity. Please update the item in your cart.");
      navigate('/cart');
      return;
    }

    try {
      setLoading(true); // Set loading state
      const user = JSON.parse(sessionStorage.getItem('user'));

      if (!user) {
        alert('Please login to place the order.');
        navigate('/login');
        return;
      }

      // Save item and totalPrice in sessionStorage before redirecting
      sessionStorage.setItem('checkoutItems', JSON.stringify([item])); // Add item to checkout session

      setOrderPlaced(true);
      
      // Redirect to checkout page
      setTimeout(() => {
        navigate('/checkout'); // Navigate to the Checkout page after 3 seconds
      }, 3000);

    } catch (err) {
      console.error(err);
      alert('❌ Failed to place order.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleRemove = () => {
    sessionStorage.removeItem('buyItem');
    sessionStorage.removeItem('totalPrice'); // Remove totalPrice on removal
    alert('Item removed from purchase');
    navigate('/');
  };

  if (!item && !orderPlaced) {
    return (
      <div>
        <Navbar />
        <Container className="text-center py-5">
          <h2>❗ No item selected for purchase.</h2>
          <p>Return to the shop and grab something delicious.</p>
          <Button type="primary" onClick={() => navigate('/')} style={btnStyle}>Back to Shop</Button>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container className="text-center py-5">
        {orderPlaced ? (
          <div>
            <h2>✅ Order Placed Successfully!</h2>
            <img
              src="/order-success.png" // Make sure this image exists in your public folder
              alt="Order Success"
              style={{ maxWidth: '300px', marginTop: 20 }}
            />
            <p>Redirecting to checkout...</p>
          </div>
        ) : (
          <>
            <h2>🛒 Confirm Purchase</h2>
            <Row>
              <Col>
                <p><strong>Product:</strong> {item.name}</p>
                <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
                <p><strong>Total:</strong> ₹{item.totalPrice ? item.totalPrice : '0.00'}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  type="primary"
                  onClick={handleCheckout}
                  style={btnStyle}
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Checkout'}
                </Button>
                <Button
                  type="danger"
                  onClick={handleRemove}
                  style={{ ...btnStyle, marginLeft: '10px' }}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

const btnStyle = {
  padding: '10px 16px',
  borderRadius: '6px',
  fontSize: '16px'
};

export default BuyNowPage;
