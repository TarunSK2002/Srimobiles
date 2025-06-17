import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Typography, Spin } from 'antd'; // Ant Design components
import { Container } from 'react-bootstrap'; // Bootstrap component

const { Title, Text } = Typography;

function CustomerShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
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
        <Title level={2} style={titleStyle}>🛒 Welcome to NutriCart!</Title>
      </header>

      <Container style={{ paddingTop: '30px' }}>
        <Title level={3} style={{ color: '#8b5e3c' }}>Shop Premium Nuts</Title>
        <Text style={{ marginBottom: '20px', color: '#555' }}>
          Explore our selection of high-quality nuts sourced from the best farms.
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
                  <Text>No products available at the moment.</Text>
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
                        cover={
                          product.image ? (
                            <img
                              alt={product.name}
                              src={`http://localhost:5000/uploads/${product.image}`}
                              style={imgStyle}
                            />
                          ) : (
                            <div style={imgStyle} />
                          )
                        }
                        onClick={() => navigate(`/product/${product.product_id}`)}
                      >
                        <Title level={4}>{product.name}</Title>
                        <Text>₹{product.actual_price} / {product.measurement_unit}</Text>

                        {offerPrice && (
                          <Text type="danger" style={{ fontWeight: 'bold', display: 'block' }}>
                            Offer Price: ₹{offerPrice.toFixed(2)} / {product.measurement_unit}
                          </Text>
                        )}

                        {/* <Text type="secondary" style={{ fontSize: '14px' }}>
                          {product.stock !== null ? `Stock: ${product.stock}` : 'Out of stock'}
                        </Text> */}
                      </Card>
                    </Col>
                  );
                })
              )}
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px 0',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #ddd',
};

const titleStyle = {
  fontSize: '28px',
  color: '#6b4226',
};

const imgStyle = {
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
};

export default CustomerShop;
