// // OrderDetailsPage.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const OrderDetailsPage = () => {
//   const { orderId } = useParams();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/order/${orderId}`);
//         setOrderDetails(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (loading) {
//     return <div>Loading order details...</div>;
//   }

//   return (
//     <div>
//       <h2>Order #{orderDetails.id}</h2>
//       <p>Status: {orderDetails.status}</p>
//       <p>Total: ₹{orderDetails.total}</p>
//       <h3>Items</h3>
//       <ul>
//         {orderDetails.items.map((item, index) => (
//           <li key={index}>
//             <p>{item.name}</p>
//             <p>Quantity: {item.quantity}</p>
//             <p>Price: ₹{item.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OrderDetailsPage;


























// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Col, Row, Spin, Typography, List, Tag } from 'antd';
// import { Container } from 'react-bootstrap';

// const { Title, Text } = Typography;

// const OrderDetailsPage = () => {
//   const { orderId } = useParams();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/order/${orderId}`);
//         setOrderDetails(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Spin size="large" />
//       </Container>
//     );
//   }

//   return (
//     <Container style={{ paddingTop: '30px' }}>
//       <Card title={<Title level={2}>Order #{orderDetails.id}</Title>} bordered={false}>
//         <Row gutter={[16, 16]}>
//           <Col span={24}>
//             <Text strong>Status: </Text>
//             <Tag color={orderDetails.status === 'Delivered' ? 'green' : 'volcano'}>{orderDetails.status}</Tag>
//           </Col>
//           <Col span={24}>
//             <Text strong>Total: </Text>
//             <Text style={{ fontSize: '18px' }}>₹{orderDetails.total}</Text>
//           </Col>
//           <Col span={24}>
//             <Title level={3}>Items</Title>
//             <List
//               bordered
//               dataSource={orderDetails.items}
//               renderItem={(item, index) => (
//                 <List.Item key={index}>
//                   <Row style={{ width: '100%' }}>
//                     <Col span={8}>
//                       <Text>{item.name}</Text>
//                     </Col>
//                     <Col span={8}>
//                       <Text>Quantity: {item.quantity}</Text>
//                     </Col>
//                     <Col span={8}>
//                       <Text>Price: ₹{item.price}</Text>
//                     </Col>
//                   </Row>
//                 </List.Item>
//               )}
//             />
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default OrderDetailsPage;

























import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Table } from 'antd';

const OrdersPage = () => {
  const columns = [
    { title: 'Order ID', dataIndex: 'id' },
    { title: 'Product', dataIndex: 'product' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Status', dataIndex: 'status' },
  ];

  const data = [
    { id: 'ORD1001', product: 'iPhone 14', date: '2025-06-01', status: 'Delivered' },
  ];

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>My Orders</h3>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;