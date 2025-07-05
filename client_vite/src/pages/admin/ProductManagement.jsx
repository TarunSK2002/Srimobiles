import React, { useState, useEffect } from 'react';
import {
  Table, Button, Card, Typography, Space, Popconfirm, message, Image, Modal, Form, 
  Input, InputNumber, Select, Upload, Row, Col
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      message.error('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.product_name.toLowerCase().includes(value));
    setFilteredProducts(filtered);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product.');
    }
  };

  const showEditModal = (product) => {
    setEditingProduct(product);
        const imageList = (product.images || []).map((img, index) => ({
      uid: `${product.id}-${index}`,
      name: img,
      status: 'done',
      url: `http://localhost:5000/uploads/${img}`,
    }));

    form.setFieldsValue({ ...product, images: imageList });
    setIsModalOpen(true);
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key !== 'images' && values[key] != null) {
        formData.append(key, values[key]);
      }
    });

        // Only append new images (the ones that are actual files, not existing URL objects)
    if (values.images && values.images.length > 0) {
      const newImages = values.images.filter(file => file.originFileObj);
      if (newImages.length > 0) {
        newImages.forEach(file => {
          formData.append('images', file.originFileObj);
        });
      } else {
        // If no new images are added, we don't want to send an empty 'images' field
        formData.delete('images');
      }
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Product updated successfully');
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      message.error('Failed to update product.');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'image',
      render: (images) => {
        const imageUrl = images && images.length > 0 ? `http://localhost:5000/uploads/${images[0]}` : 'https://via.placeholder.com/80';
        return (
          <Image
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
            src={imageUrl}
            alt="Product Image"
            fallback="https://via.placeholder.com/80"
          />
        );
      },
    },
    { title: 'Product Name', dataIndex: 'product_name', key: 'product_name', sorter: (a, b) => a.product_name.localeCompare(b.product_name) },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    { title: 'Price', dataIndex: 'actual_price', key: 'actual_price', render: (price) => `₹${Number(price).toFixed(2)}`, sorter: (a, b) => a.actual_price - b.actual_price },
    { title: 'Stock', dataIndex: 'stock_quantity', key: 'stock_quantity', sorter: (a, b) => a.stock_quantity - b.stock_quantity },
    {
      title: 'Actions', key: 'actions', render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}><Button danger icon={<DeleteOutlined />}>Delete</Button></Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card bordered={false} style={{ borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '1.5rem' }}>
          <Col><Title level={2} style={{ margin: 0 }}>Product Management</Title></Col>
                    <Col><Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => navigate('/admin/products/add')}>Add Product</Button></Col>
        </Row>
        <Input.Search placeholder="Search by Product Name..." onChange={handleSearch} allowClear style={{ marginBottom: '1.5rem' }} />
        <Table dataSource={filteredProducts} columns={columns} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} bordered />
      </Card>

      {editingProduct && (
        <Modal title={`Edit: ${editingProduct.product_name}`} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} width={800}>
          <Form form={form} layout="vertical" onFinish={handleUpdate} initialValues={editingProduct}>
            {/* Re-using a simplified version of your AddProduct form */}
            <Row gutter={16}>
              <Col span={12}><Form.Item name="product_name" label="Product Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
              <Col span={12}><Form.Item name="brand" label="Brand" rules={[{ required: true }]}><Input /></Form.Item></Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}><Form.Item name="model" label="Model" rules={[{ required: true }]}><Input /></Form.Item></Col>
              <Col span={12}><Form.Item name="category" label="Category" rules={[{ required: true }]}><Input /></Form.Item></Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}><Form.Item name="actual_price" label="Price" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} /></Form.Item></Col>
              <Col span={8}><Form.Item name="stock_quantity" label="Stock" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} /></Form.Item></Col>
              <Col span={8}><Form.Item name="color" label="Color"><Input /></Form.Item></Col>
            </Row>
            <Form.Item name="images" label="Replace Images" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
              <Upload listType="picture" beforeUpload={() => false} multiple><Button icon={<UploadOutlined />}>Click to Upload</Button></Upload>
            </Form.Item>
            <Form.Item><Button type="primary" htmlType="submit" block>Update Product</Button></Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default ProductManagement;
