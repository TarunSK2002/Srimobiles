// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from '../../components/Navbar';
// import { useNavigate } from 'react-router-dom';
// import { Card, Button, Row, Col, Typography, Spin } from 'antd'; // Ant Design components
// import { Container } from 'react-bootstrap'; // Bootstrap component

// const { Title, Text } = Typography;

// function CustomerShop() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios.get('http://localhost:5000/api/products/all')
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Failed to fetch products:', err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <header style={headerStyle}>
//         <Title level={2} style={titleStyle}>🛒 Welcome to NutriCart!</Title>
//       </header>

//       <Container style={{ paddingTop: '30px' }}>
//         <Title level={3} style={{ color: '#8b5e3c' }}>Shop Premium Nuts</Title>
//         <Text style={{ marginBottom: '20px', color: '#555' }}>
//           Explore our selection of high-quality nuts sourced from the best farms.
//         </Text>

//         <div style={{ marginTop: '20px' }}>
//           {loading ? (
//             <div style={{ textAlign: 'center', marginTop: '50px' }}>
//               <Spin size="large" />
//             </div>
//           ) : (
//             <Row gutter={[16, 16]}>
//               {products.length === 0 ? (
//                 <Col span={24}>
//                   <Text>No products available at the moment.</Text>
//                 </Col>
//               ) : (
//                 products.map((product) => {
//                   const offerPrice = product.offer_percentage
//                     ? product.actual_price - (product.actual_price * product.offer_percentage) / 100
//                     : null;

//                   return (
//                     <Col xs={24} sm={12} md={8} key={product.product_id}>
//                       <Card
//                         hoverable
//                         cover={
//                           product.image ? (
//                             <img
//                               alt={product.name}
//                               src={`http://localhost:5000/uploads/${product.image}`}
//                               style={imgStyle}
//                             />
//                           ) : (
//                             <div style={imgStyle} />
//                           )
//                         }
//                         onClick={() => navigate(`/product/${product.product_id}`)}
//                       >
//                         <Title level={4}>{product.name}</Title>
//                         <Text>₹{product.actual_price} / {product.measurement_unit}</Text>

//                         {offerPrice && (
//                           <Text type="danger" style={{ fontWeight: 'bold', display: 'block' }}>
//                             Offer Price: ₹{offerPrice.toFixed(2)} / {product.measurement_unit}
//                           </Text>
//                         )}

//                         {/* <Text type="secondary" style={{ fontSize: '14px' }}>
//                           {product.stock !== null ? `Stock: ${product.stock}` : 'Out of stock'}
//                         </Text> */}
//                       </Card>
//                     </Col>
//                   );
//                 })
//               )}
//             </Row>
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// }

// const headerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: '30px 0',
//   backgroundColor: '#f5f5f5',
//   borderBottom: '1px solid #ddd',
// };

// const titleStyle = {
//   fontSize: '28px',
//   color: '#6b4226',
// };

// const imgStyle = {
//   height: '200px',
//   objectFit: 'cover',
//   borderRadius: '8px',
// };

// export default CustomerShop;






























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import { useNavigate } from 'react-router-dom';
// import { Card, Row, Col, Typography, Spin } from 'antd';
// import { Container } from 'react-bootstrap';

// const { Title, Text } = Typography;

// function CustomerShop() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios.get('http://localhost:5000/api/products/all')
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Failed to fetch products:', err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <Navbar />

//       <header style={headerStyle}>
//         <Title level={2} style={titleStyle}>📱 Welcome to Sri Mobiles!</Title>
//       </header>

//       <Container style={{ paddingTop: '30px', paddingBottom: '50px' }}>
//         <Title level={3} style={{ color: '#003366' }}>Shop the Latest Mobile Phones</Title>
//         <Text style={{ marginBottom: '20px', color: '#555' }}>
//           Discover the newest smartphones with great deals and offers.
//         </Text>

//         <div style={{ marginTop: '20px' }}>
//           {loading ? (
//             <div style={{ textAlign: 'center', marginTop: '50px' }}>
//               <Spin size="large" />
//             </div>
//           ) : (
//             <Row gutter={[16, 16]}>
//               {products.length === 0 ? (
//                 <Col span={24}>
//                   <Text>No mobile phones available at the moment.</Text>
//                 </Col>
//               ) : (
//                 products.map((product) => {
//                   const offerPrice = product.offer_percentage
//                     ? product.actual_price - (product.actual_price * product.offer_percentage) / 100
//                     : null;

//                   return (
//                     <Col xs={24} sm={12} md={8} key={product.product_id}>
//                       <Card
//                         hoverable
//                         style={{ cursor: product.stock > 0 ? 'pointer' : 'not-allowed' }}
//                         cover={
//                           product.image ? (
//                             <img
//                               alt={product.name}
//                               src={`http://localhost:5000/uploads/${product.image}`}
//                               style={imgStyle}
//                               loading="lazy"
//                             />
//                           ) : (
//                             <div style={{ ...imgStyle, backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                               <Text type="secondary">No Image</Text>
//                             </div>
//                           )
//                         }
//                         onClick={() => product.stock > 0 && navigate(`/product/${product.product_id}`)}
//                       >
//                         <Title level={4}>{product.name}</Title>
//                         <Text>₹{product.actual_price}</Text>

//                         {offerPrice && (
//                           <Text type="danger" style={{ fontWeight: 'bold', display: 'block' }}>
//                             Offer Price: ₹{offerPrice.toFixed(2)}
//                           </Text>
//                         )}

//                         <Text type={product.stock > 0 ? "success" : "danger"} style={{ fontSize: '14px', display: 'block', marginTop: '5px' }}>
//                           {product.stock !== null ? `Stock: ${product.stock}` : 'Out of stock'}
//                         </Text>
//                       </Card>
//                     </Col>
//                   );
//                 })
//               )}
//             </Row>
//           )}
//         </div>
//       </Container>

//       <Footer />
//     </div>
//   );
// }

// const headerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: '30px 0',
//   backgroundColor: '#e6f0ff',
//   borderBottom: '1px solid #b3c6ff',
// };

// const titleStyle = {
//   fontSize: '28px',
//   color: '#003366',
// };

// const imgStyle = {
//   height: '250px',
//   objectFit: 'contain',
//   borderRadius: '8px',
//   backgroundColor: '#fff',
// };

// export default CustomerShop;




















// import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/Navbar';
// import CategoryBar from '../../components/CategoryBar';
// import BannerSlider from '../../components/BannerSlider';
// import ProductCard from '../../components/ProductCard';
// import Footer from '../../components/Footer';
// import { Row, Col, Spin, Alert } from 'antd';

// const CustomerShop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/products')
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         return res.json();
//       })
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <CategoryBar />
//       <BannerSlider />

//       <div className="container mt-4" style={{ padding: '0 20px' }}>
//         <h3>Featured Products</h3>

//         {loading && (
//           <div style={{ textAlign: 'center', marginTop: 50 }}>
//             <Spin size="large" />
//           </div>
//         )}

//         {error && (
//           <Alert
//             message="Error"
//             description={error}
//             type="error"
//             showIcon
//             style={{ marginBottom: 20 }}
//           />
//         )}

//         {!loading && !error && (
//           <Row gutter={[16, 16]}>
//             {products.map(product => (
//               <Col xs={24} sm={12} md={6} key={product.id}>
//                 <ProductCard product={product} />
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CustomerShop;


















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import CategoryBar from '../../components/CategoryBar';
import BannerSlider from '../../components/BannerSlider';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Spin } from 'antd';
import { Container } from 'react-bootstrap';

const { Title, Text } = Typography;

function CustomerShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/products/all')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <header style={headerStyle}>
        <Title level={2} style={titleStyle}>📱 Welcome to Sri Mobiles!</Title>
      </header>
      <CategoryBar />
      <BannerSlider />
      <Container style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <Title level={3} style={{ color: '#003366' }}>Shop the Latest Mobile Phones</Title>
        <Text style={{ marginBottom: '20px', color: '#555' }}>
          Discover the newest smartphones with great deals and offers.
        </Text>

        <div style={{ marginTop: '20px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {products.length === 0 ? (
                <Col span={24}>
                  <Text>No mobile phones available at the moment.</Text>
                </Col>
              ) : (
                products.map((product) => {
                  const offerPrice = product.offer_percentage
                    ? product.actual_price - (product.actual_price * product.offer_percentage) / 100
                    : null;

                  return (
                    <Col xs={24} sm={12} md={8} key={product.product_id}>
                      <Card
                        hoverable
                        style={{ cursor: product.stock > 0 ? 'pointer' : 'not-allowed' }}
                        cover={
                          product.image ? (
                            <img
                              alt={product.name}
                              crossOrigin='anonymos'
                              src={`http://localhost:5000/uploads/${product.image}`}
                              style={imgStyle}
                              loading="lazy"
                            />
                          ) : (
                            <div style={{ ...imgStyle, backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <Text type="secondary">No Image</Text>
                            </div>
                          )
                        }
                        onClick={() => product.stock > 0 && navigate(`/product/${product.product_id}`)}
                      >
                        <Title level={4}>{product.name}</Title>
                        <Text>₹{product.actual_price}</Text>

                        {offerPrice && (
                          <Text type="danger" style={{ fontWeight: 'bold', display: 'block' }}>
                            Offer Price: ₹{offerPrice.toFixed(2)}
                          </Text>
                        )}

                        <Text type={product.stock > 0 ? "success" : "danger"} style={{ fontSize: '14px', display: 'block', marginTop: '5px' }}>
                          {product.stock !== null ? `Stock: ${product.stock}` : 'Out of stock'}
                        </Text>
                      </Card>
                    </Col>
                  );
                })
              )}
            </Row>
          )}
        </div>
      </Container>

      <Footer />
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px 0',
  backgroundColor: '#e6f0ff',
  borderBottom: '1px solid #b3c6ff',
};

const titleStyle = {
  fontSize: '28px',
  color: '#003366',
};

const imgStyle = {
  height: '250px',
  objectFit: 'contain',
  borderRadius: '8px',
  backgroundColor: '#fff',
};

export default CustomerShop;
``
