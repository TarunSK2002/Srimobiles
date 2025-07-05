import React from 'react';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { Row, Col } from 'antd';
import { Navbar } from 'react-bootstrap';

const HomePage = () => {
  const dummyProducts = [
    { id: 1, name: 'iPhone 14', price: '₹79,999', image: '/images/iphone.jpg' },
    { id: 2, name: 'Samsung Galaxy S23', price: '₹69,999', image: '/images/samsung.jpg' },
    { id: 3, name: 'OnePlus 11', price: '₹59,999', image: '/images/oneplus.jpg' },
    { id: 4, name: 'Realme Pad', price: '₹19,999', image: '/images/realme.jpg' },
  ];

  return (
    <>
      <Header />
      <Navbar />
      <CategoryBar />
      <BannerSlider />
      <div className="container mt-4">
        <h3>Featured Products</h3>
        <Row gutter={[16, 16]}>
          {dummyProducts.map(product => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
