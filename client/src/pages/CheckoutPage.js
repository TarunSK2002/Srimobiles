// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { Button, Row, Col, Card, Spin } from 'antd'; // Ant Design components
// import { Container } from 'react-bootstrap'; // Bootstrap component

// const CheckoutPage = () => {
//   const [checkoutItems, setCheckoutItems] = useState([]);
//   const [loading, setLoading] = useState(false); // Loading state for the place order action
//   const navigate = useNavigate();

//   useEffect(() => {
//     const items = JSON.parse(sessionStorage.getItem('checkoutItems')) || [];
//     if (items.length === 0) {
//       navigate('/');
//     } else {
//       setCheckoutItems(items);
//     }
//   }, [navigate]);

//   // Calculate the total amount
//   const getTotalAmount = () => {
//     return checkoutItems.reduce((total, item) => {
//       const validTotalPrice = typeof item.totalPrice === 'number' ? item.totalPrice : parseFloat(item.totalPrice);
//       return total + validTotalPrice;
//     }, 0);
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       if (checkoutItems.length === 0) {
//         alert('No items in checkout!');
//         return;
//       }

//       const user = JSON.parse(sessionStorage.getItem('user'));
//       if (!user || !user.id) {
//         alert('User information not found. Please log in again.');
//         navigate('/login');
//         return;
//       }

//       setLoading(true); // Start loading when the order is placed

//       await axios.post('http://localhost:5000/api/order/place-order', {
//         items: checkoutItems,
//         userId: user.id,
//       });

//       // Clear sessionStorage after placing the order
//       sessionStorage.removeItem('cart');
//       sessionStorage.removeItem('checkoutItems');

//       alert('🎉 Order placed successfully!');
//       navigate('/');
//     } catch (err) {
//       console.error(err);
//       alert('❌ Failed to place order.');
//     } finally {
//       setLoading(false); // Stop loading after the request is completed
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Container className="py-5">
//         <h2 className="text-center">🧾 Checkout</h2>

//         {checkoutItems.length === 0 ? (
//           <div className="text-center">
//             <p>Your checkout list is empty.</p>
//             <Button type="primary" onClick={() => navigate('/')} size="large">
//               Back to Shop
//             </Button>
//           </div>
//         ) : (
//           <Row gutter={[16, 16]}>
//             {checkoutItems.map((item, index) => (
//               <Col xs={24} sm={12} md={8} key={index}>
//                 <Card
//                   title={item.name}
//                   bordered={false}
//                   style={{ width: '100%' }}
//                 >
//                   <p>Quantity: {item.quantity} {item.unit}</p>
//                   <p>Price: ₹{parseFloat(item.totalPrice).toFixed(2)}</p>
//                 </Card>
//               </Col>
//             ))}

//             <Col span={24}>
//               <h3 className="text-right mt-3">
//                 Total: ₹{getTotalAmount().toFixed(2)}
//               </h3>

//               <Button
//                 type="primary"
//                 onClick={handlePlaceOrder}
//                 style={{ width: '100%', marginTop: 20 }}
//                 size="large"
//                 loading={loading}
//                 disabled={loading}
//               >
//                 {loading ? <Spin /> : '🛍️ Place Order'}
//               </Button>
//             </Col>
//           </Row>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default CheckoutPage;














import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Button, Row, Col, Card, message } from 'antd';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const CheckoutPage = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem('checkoutItems')) || [];
    if (items.length === 0) {
      navigate('/');
    } else {
      setCheckoutItems(items);
    }
  }, [navigate]);

  const getTotalAmount = () => {
    return checkoutItems.reduce((total, item) => {
      const validTotalPrice = typeof item.totalPrice === 'number'
        ? item.totalPrice
        : parseFloat(item.totalPrice) || 0;
      return total + validTotalPrice;
    }, 0);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (checkoutItems.length === 0) {
      message.warning('No items in checkout!');
      return;
    }

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || !user.id) {
      message.error('User information not found. Please login again.');
      navigate('/login');
      return;
    }

    setLoading(true);

    const totalAmount = getTotalAmount();
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        message.error('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      const razorpayOrder = await axios.post('http://localhost:5000/api/order/create-razorpay-order', {
        amount: totalAmount,
      });

      const options = {
        key: 'rzp_test_theRKeq6fdRQfl', // ✅ Replace with your real Razorpay Key ID
        amount: razorpayOrder.data.amount,
        currency: razorpayOrder.data.currency,
        name: 'Nut Store',
        description: 'Order Payment',
        order_id: razorpayOrder.data.id,
        handler: async function (response) {
          // Payment successful, now place order
          try {
            await axios.post('http://localhost:5000/api/order/place-order', {
              items: checkoutItems,
              userId: user.id,
            });

            sessionStorage.removeItem('cart');
            sessionStorage.removeItem('checkoutItems');

            message.success('🎉 Order placed successfully!');
            navigate('/');
          } catch (err) {
            console.error('Error while placing order after payment:', err);
            message.error('❌ Order placed failed after payment.');
          }
        },
        prefill: {
          name: user.name || 'Customer',
          email: user.email || 'test@example.com',
          contact: user.contact ||'9999999999', // You can update if you store phone number
        },
        notes: {
          address: 'Nut Store Corporate Office',
        },
        theme: {
          color: '#0d6efd',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during checkout:', error);
      message.error('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Nut Store</title>
      </Helmet>

      <Navbar />

      <Container className="py-5">
        <h2 className="text-center mb-4">🧾 Checkout</h2>

        {checkoutItems.length === 0 ? (
          <div className="text-center">
            <p>Your checkout list is empty.</p>
            <Button
              type="primary"
              onClick={() => navigate('/')}
              size="large"
            >
              Back to Shop
            </Button>
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {checkoutItems.map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  title={item.name}
                  bordered={false}
                  hoverable
                  style={{ width: '100%' }}
                >
                  <p>Quantity: {item.quantity} {item.unit}</p>
                  <p>Price: ₹{parseFloat(item.totalPrice || 0).toFixed(2)}</p>
                </Card>
              </Col>
            ))}

            <Col span={24}>
              <h3 className="text-right mt-4">
                Total: ₹{getTotalAmount().toFixed(2)}
              </h3>

              <Button
                type="primary"
                onClick={handlePlaceOrder}
                loading={loading}
                disabled={loading}
                style={{ width: '100%', marginTop: 20 }}
                size="large"
              >
                🛍️ Pay & Place Order
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default CheckoutPage;
