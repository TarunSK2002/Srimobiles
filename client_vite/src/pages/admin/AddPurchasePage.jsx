import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPurchasePage() {
  const [form] = Form.useForm(); // Ant Design form instance

  const [formData, setFormData] = useState({
    product_id: '',
    dealer_id: '',
    quantity: 0,
    purchase_price: '',
  });

  const handleProductIdChange = (e) => {
    setFormData((prev) => ({ ...prev, product_id: e.target.value }));
  };

  const handleDealerIdChange = (e) => {
    setFormData((prev) => ({ ...prev, dealer_id: e.target.value }));
  };

  const handleProductIdBlur = () => {
    const { product_id } = formData;
    if (product_id) {
      axios
        .get(`http://localhost:5000/api/products/${product_id}`)
        .then((res) => {
          if (res.data?.name) {
            form.setFieldsValue({ productName: res.data.name });
          } else {
            form.setFieldsValue({ productName: '' });
            message.error('Product not found');
          }
        })
        .catch(() => {
          form.setFieldsValue({ productName: '' });
          message.error('Product not found');
        });
    }
  };

  const handleDealerIdBlur = () => {
    const { dealer_id } = formData;
    if (dealer_id) {
      axios
        .get(`http://localhost:5000/api/dealers/get/${dealer_id}`)
        .then((res) => {
          if (res.data?.name) {
            form.setFieldsValue({ dealer_name: res.data.name });
          } else {
            form.setFieldsValue({ dealer_name: '' });
            message.error('Dealer not found');
          }
        })
        .catch(() => {
          form.setFieldsValue({ dealer_name: '' });
          message.error('Dealer not found');
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = form.getFieldsValue();
    const { product_id, dealer_id, quantity, purchase_price } = values;

    if (!product_id || !dealer_id || !quantity || !purchase_price) {
      message.error('Please fill all required fields');
      return;
    }

    axios
      .post('http://localhost:5000/api/purchases/add', values)
      .then(() => {
        message.success('Purchase added successfully');

        axios
          .put(`http://localhost:5000/api/products/update-stock/${product_id}`, {
            quantity: Number(quantity),
          })
          .then(() => {
            message.success('Stock updated successfully');
            form.resetFields();
            setFormData({
              product_id: '',
              dealer_id: '',
              quantity: 0,
              purchase_price: '',
            });
          })
          .catch((err) => {
            console.error('Error updating product stock:', err);
            message.error('Error updating stock');
          });
      })
      .catch((err) => {
        console.error('Error adding purchase:', err);
        message.error('Error adding purchase');
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Purchase</h2>
      <Form
        layout="vertical"
        form={form}
        onSubmitCapture={handleSubmit}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form.Item
          label="Product ID"
          name="product_id"
          rules={[{ required: true, message: 'Please input the product ID!' }]}
        >
          <Input
            value={formData.product_id}
            onChange={handleProductIdChange}
            onBlur={handleProductIdBlur}
            placeholder="Enter product ID"
          />
        </Form.Item>

        <Form.Item label="Product Name" name="productName">
          <Input readOnly placeholder="Product name will be auto-filled" />
        </Form.Item>

        <Form.Item
          label="Dealer ID"
          name="dealer_id"
          rules={[{ required: true, message: 'Please input the dealer ID!' }]}
        >
          <Input
            value={formData.dealer_id}
            onChange={handleDealerIdChange}
            onBlur={handleDealerIdBlur}
            placeholder="Enter dealer ID"
          />
        </Form.Item>

        <Form.Item label="Dealer Name" name="dealer_name">
          <Input readOnly placeholder="Dealer name will be auto-filled" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <Input
            type="number"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
            placeholder="Enter quantity"
          />
        </Form.Item>

        <Form.Item
          label="Purchase Price"
          name="purchase_price"
          rules={[{ required: true, message: 'Please input the purchase price!' }]}
        >
          <Input
            type="number"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                purchase_price: e.target.value,
              }))
            }
            placeholder="Enter purchase price"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Purchase
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddPurchasePage;
