// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Col, Row, Button, Select, InputNumber, Typography, Spin, notification } from 'antd';
// import Navbar from '../components/Navbar';
// import { Container } from 'react-bootstrap';

// const { Title, Text } = Typography;

// const ProductDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [unit, setUnit] = useState('250g');
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/products/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

  
//   if (!product) return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <Spin size="large" />
//     </Container>
//   );

//   const basePricePerGram = product.actual_price;
//   const offerPricePerGram = product.offer_price;
//   const offerPercentage = product.offer_percentage;

//   const calculatePrice = (unit) => {
//     let unitInGrams = 0;
//     switch (unit) {
//       case '250g':
//         unitInGrams = 1;
//         break;
//       case '500g':
//         unitInGrams = 2;
//         break;
//       case '750g':
//         unitInGrams = 3;
//         break;
//       case '1kg':
//         unitInGrams = 4;
//         break;
//       default:
//         unitInGrams = 0;
//         break;
//     }

//     return offerPricePerGram * unitInGrams * quantity;
//   };

//   const unitPrice = calculatePrice(unit);
//   const totalPrice = unitPrice;

//   const handleAddToCart = () => {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     const cartItem = { ...product, unit, quantity, unitPrice, totalPrice };

//     if (!user) {
//       sessionStorage.setItem('pendingCartItem', JSON.stringify(cartItem));
//       navigate('/login');
//     } else {
//       const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
//       cart.push(cartItem);
//       sessionStorage.setItem('cart', JSON.stringify(cart));
//       notification.success({ message: 'Added to cart!' });
//     }
//   };

//   const handleBuyNow = () => {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     const buyItem = { ...product, unit, quantity, unitPrice, totalPrice };

//     if (!user) {
//       sessionStorage.setItem('pendingBuyItem', JSON.stringify(buyItem));
//       navigate('/login');
//     } else {
//       sessionStorage.setItem('buyItem', JSON.stringify(buyItem));
//       navigate('/buy-now');
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Container className="mt-5">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} md={12}>
//             <Card
//               cover={<img alt={product.name} src={`http://localhost:5000/uploads/${product.image}`} />}
//             />
//           </Col>
//           <Col xs={24} md={12}>
//             <Card bordered={false}>
//               <Title level={2}>{product.name}</Title>
//               <div>
//                 <Text type="secondary">Base Price: </Text>
//                 <Text delete>₹{basePricePerGram} / gram</Text>
//               </div>
//               <div>
//                 <Text strong>Offer Price: </Text>
//                 <Text style={{ color: '#27ae60' }}>
//                   ₹{offerPricePerGram} / gram ({offerPercentage}% off)
//                 </Text>
//               </div>
//               <div style={{ marginTop: '20px' }}>
//                 <Text strong>Price: </Text>
//                 <Text style={{ fontSize: '22px', color: '#e74c3c' }}>
//                   {unit} × {quantity} = ₹{totalPrice.toFixed(2)}
//                 </Text>
//               </div>

//               <div style={{ marginTop: '20px' }}>
//                 <Text strong>Quantity Unit:</Text>
//                 <Select value={unit} onChange={setUnit} style={{ width: '100%', marginTop: '10px' }}>
//                   <Select.Option value="250g">250g</Select.Option>
//                   <Select.Option value="500g">500g</Select.Option>
//                   <Select.Option value="750g">750g</Select.Option>
//                   <Select.Option value="1kg">1kg</Select.Option>
//                 </Select>
//               </div>

//               <div style={{ marginTop: '20px' }}>
//                 <Text strong>Quantity:</Text>
//                 <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//                   <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
//                   <InputNumber
//                     min={1}
//                     value={quantity}
//                     onChange={(value) => setQuantity(value)}
//                     style={{ width: '60px', margin: '0 10px' }}
//                   />
//                   <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
//                 </div>
//               </div>

//               <div style={{ marginTop: '20px' }}>
//                 <Text strong>Total:</Text>
//                 <Text style={{ fontSize: '20px', color: '#e74c3c' }}> ₹{totalPrice.toFixed(2)}</Text>
//               </div>

//               <div style={{ marginTop: '20px' }}>
//                 <Button type="primary" onClick={handleAddToCart} style={{ width: '100%' }}>Add to Cart</Button>
//                 <Button type="danger" onClick={handleBuyNow} style={{ width: '100%', marginTop: '10px' }}>Buy Now</Button>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ProductDetailsPage;















import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Col, Row, Button, Select, InputNumber, Typography, Spin, notification, Alert } from 'antd';
import Navbar from '../components/Navbar';
import { Container } from 'react-bootstrap';

const { Title, Text } = Typography;

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [unit, setUnit] = useState('250g');
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Spin size="large" />
    </Container>
  );

  const basePricePerGram = product.actual_price;
  const offerPricePerGram = product.offer_price;
  const offerPercentage = product.offer_percentage;

  const calculatePrice = (unit) => {
    let unitInGrams = 0;
    switch (unit) {
      case '250g':
        unitInGrams = 1;
        break;
      case '500g':
        unitInGrams = 2;
        break;
      case '750g':
        unitInGrams = 3;
        break;
      case '1kg':
        unitInGrams = 4;
        break;
      default:
        unitInGrams = 0;
        break;
    }

    return offerPricePerGram * unitInGrams * quantity;
  };

  const unitPrice = calculatePrice(unit);
  const totalPrice = unitPrice;

  const handleAddToCart = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const cartItem = { ...product, unit, quantity, unitPrice, totalPrice };

    if (!user) {
      sessionStorage.setItem('pendingCartItem', JSON.stringify(cartItem));
      navigate('/login');
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.push(cartItem);
      sessionStorage.setItem('cart', JSON.stringify(cart));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleBuyNow = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const buyItem = { ...product, unit, quantity, unitPrice, totalPrice };

    if (!user) {
      sessionStorage.setItem('pendingBuyItem', JSON.stringify(buyItem));
      navigate('/login');
    } else {
      sessionStorage.setItem('buyItem', JSON.stringify(buyItem));
      navigate('/buy-now');
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              cover={<img alt={product.name} src={`http://localhost:5000/uploads/${product.image}`} />}
            />
          </Col>
          <Col xs={24} md={12}>
            {showAlert && (
              <Alert
                message="Product added to cart!"
                type="success"
                showIcon
                closable
                style={{ marginBottom: '20px' }}
              />
            )}
            <Card bordered={false}>
              <Title level={2}>{product.name}</Title>
              <div>
                <Text type="secondary">Base Price: </Text>
                <Text delete>₹{basePricePerGram} / gram</Text>
              </div>
              <div>
                <Text strong>Offer Price: </Text>
                <Text style={{ color: '#27ae60' }}>
                  ₹{offerPricePerGram} / gram ({offerPercentage}% off)
                </Text>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Text strong>Price: </Text>
                <Text style={{ fontSize: '22px', color: '#e74c3c' }}>
                  {unit} × {quantity} = ₹{totalPrice.toFixed(2)}
                </Text>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Text strong>Quantity Unit:</Text>
                <Select value={unit} onChange={setUnit} style={{ width: '100%', marginTop: '10px' }}>
                  <Select.Option value="250g">250g</Select.Option>
                  <Select.Option value="500g">500g</Select.Option>
                  <Select.Option value="750g">750g</Select.Option>
                  <Select.Option value="1kg">1kg</Select.Option>
                </Select>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Text strong>Quantity:</Text>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                    style={{ width: '60px', margin: '0 10px' }}
                  />
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Text strong>Total:</Text>
                <Text style={{ fontSize: '20px', color: '#e74c3c' }}> ₹{totalPrice.toFixed(2)}</Text>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Button type="primary" onClick={handleAddToCart} style={{ width: '100%' }}>Add to Cart</Button>
                <Button type="danger" onClick={handleBuyNow} style={{ width: '100%', marginTop: '10px' }}>Buy Now</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetailsPage;
