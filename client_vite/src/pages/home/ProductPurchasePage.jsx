import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button, InputNumber, Select } from 'antd';

const ProductPurchasePage = () => {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>Purchase Product</h3>
        <p>iPhone 14 - ₹79,999</p>
        <div className="mb-3">
          <Select defaultValue="1 Kg" style={{ width: 120 }}>
            <Select.Option value="1 Kg">1 Kg</Select.Option>
            <Select.Option value="500 g">500 g</Select.Option>
          </Select>
        </div>
        <div className="mb-3">
          <InputNumber min={1} defaultValue={1} />
        </div>
        <Button type="primary" className="me-2">Add to Cart</Button>
        <Button type="default">Buy Now</Button>
      </div>
      <Footer />
    </>
  );
};

export default ProductPurchasePage;