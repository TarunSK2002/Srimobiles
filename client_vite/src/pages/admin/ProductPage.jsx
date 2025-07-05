import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Input, Button, notification, Form } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap styles
import 'antd/dist/reset.css';  // Ant Design styles

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [offerPercentage, setOfferPercentage] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products/all')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  const handleApplyOffer = (productId) => {
    if (offerPercentage < 0 || offerPercentage > 100) {
      notification.error({ message: 'Offer percentage must be between 0 and 100' });
      return;
    }
    axios.put(`http://localhost:5000/api/products/update-offer/${productId}`, { offer_percentage: Number(offerPercentage) })
      .then(() => {
        notification.success({ message: 'Offer updated successfully!' });
        setOfferPercentage(0);
        setSelectedProductId(null);
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error updating offer:', error);
        notification.error({ message: 'Failed to update offer.' });
      });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => (
        image ? (
          <img
            src={`http://localhost:5000/uploads/${image}`}
            alt="product"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        ) : 'No Image'
      ),
    },
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actual Price',
      dataIndex: 'actual_price',
      key: 'actual_price',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Measurement Unit',
      dataIndex: 'measurement_unit',
      key: 'measurement_unit',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => stock === null ? 'N/A' : stock,
    },
    {
      title: 'Offer %',
      dataIndex: 'offer_percentage',
      key: 'offer_percentage',
      render: (offer_percentage) => `${offer_percentage || 0}%`,
    },
    {
      title: 'Offer Price',
      dataIndex: 'offer_price',
      key: 'offer_price',
      render: (offer_price, record) =>
        offer_price
          ? `₹${offer_price}`
          : `₹${(record.actual_price - (record.actual_price * (record.offer_percentage || 0)) / 100).toFixed(2)}`,
    },
    {
      title: 'Set Offer %',
      key: 'set_offer',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            type="number"
            min={0}
            max={100}
            style={{ width: '80px', marginRight: 10 }}
            placeholder="0-100"
            value={selectedProductId === record.product_id ? offerPercentage : ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
                setSelectedProductId(record.product_id);
                setOfferPercentage(val);
              }
            }}
          />
          <Button
            type="primary"
            disabled={selectedProductId !== record.product_id || offerPercentage === '' || offerPercentage === 0}
            onClick={() => handleApplyOffer(record.product_id)}
          >
            Apply
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Product Management</h2>
      <Button type="primary" className="mb-3" onClick={handleAddProduct}>
        Add Product
      </Button>
      <Table
        rowKey="product_id"
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default ProductPage;
