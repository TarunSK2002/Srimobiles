import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Form, Input, Button } from 'antd';

const CustomerSupportPage = () => {
  const onFinish = values => console.log(values);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>Customer Support</h3>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default CustomerSupportPage;