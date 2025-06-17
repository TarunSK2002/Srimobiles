// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Card, Spin, List, Typography, notification } from 'antd';
// import Navbar from '../components/Navbar';
// import axios from 'axios';

// const { Title, Text } = Typography;

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch user details and orders when component mounts
//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     console.log(user); // Log the user object for debugging

//     // Handle case when user is not found
//     if (!user || !user.id) {
//       notification.error({
//         message: 'Please login to view your profile.',
//       });
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     const fetchData = async () => {
//       try {
//         // Fetch user details from the backend
//         const userRes = await axios.get(`http://localhost:5000/api/user/${user.id}`);
//         setUserDetails(userRes.data);

//         // Fetch user's order details
//         const ordersRes = await axios.get(`http://localhost:5000/api/order/user/${user.id}`);
//         setOrders(ordersRes.data); // Populate orders state with fetched data
//         console.log(ordersRes.data);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         notification.error({
//           message: 'Error fetching data. Please try again later.',
//         });
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="text-center" style={{ paddingTop: '50px' }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <Navbar />
//       <div style={{ padding: 20 }}>
//         <Card
//           title={<Title level={2}>🧑‍🦱 Personal Details</Title>}
//           bordered
//           style={{ marginBottom: '30px' }}
//         >
//           {userDetails ? (
//             <div>
//               <Text strong>Name: </Text>
//               <Text>{userDetails.name}</Text>
//               <br />
//               <Text strong>Email: </Text>
//               <Text>{userDetails.email}</Text>
//               <br />
//               <Text strong>Address: </Text>
//               <Text>{userDetails.address}</Text>
//               {/* Add more fields if needed */}
//             </div>
//           ) : (
//             <Text>No personal details available.</Text>
//           )}
//         </Card>

//         <Card
//           title={<Title level={2}>📦 Order Details</Title>}
//           bordered
//         >
//           {orders.length > 0 ? (
//             <List
//               itemLayout="vertical"
//               size="large"
//               dataSource={orders}
//               renderItem={(order) => (
//                 <List.Item
//                   key={order.id}
//                   extra={
//                     <Button
//                       type="primary"
//                       onClick={() => navigate(`/order/${order.id}`)}
//                     >
//                       View Order
//                     </Button>
//                   }
//                 >
//                   <List.Item.Meta
//                     title={`Order #${order.id}`}
//                     description={`Date: ${new Date(order.order_date).toLocaleDateString()}`}
//                   />
//                   <Text>Status: {order.order_status}</Text>
//                   <br />
//                   <Text>Total: ₹{order.total_amount}</Text>
//                 </List.Item>
//               )}
//             />
//           ) : (
//             <Text>You have no orders yet.</Text>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;









// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, Card, Spin, List, Typography, notification, Input, Form } from 'antd';
// import Navbar from '../components/Navbar';
// import axios from 'axios';

// const { Title, Text } = Typography;

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [addresses, setAddresses] = useState([]); // New state for saved addresses
//   const [loading, setLoading] = useState(true);
//   const [newAddress, setNewAddress] = useState(""); // State to manage the new address input
//   const [loadingAddress, setLoadingAddress] = useState(false); // State to manage address loading

//   // Fetch user details, orders, and addresses when component mounts
//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem('user'));
//     console.log(user); // Log the user object for debugging

//     // Handle case when user is not found
//     if (!user || !user.id) {
//       notification.error({
//         message: 'Please login to view your profile.',
//       });
//       navigate('/login');
//       return;
//     }

//     setLoading(true);
//     const fetchData = async () => {
//       try {
//         // Fetch user details from the backend
//         const userRes = await axios.get(`http://localhost:5000/api/user/${user.id}`);
//         setUserDetails(userRes.data);

//         // Fetch user's order details
//         const ordersRes = await axios.get(`http://localhost:5000/api/order/user/${user.id}`);
//         setOrders(ordersRes.data);

//         // Fetch user's saved addresses
//         const addressesRes = await axios.get(`http://localhost:5000/api/address/user/${user.id}`);
//         setAddresses(addressesRes.data); // Populate addresses state with fetched data
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         notification.error({
//           message: 'Error fetching data. Please try again later.',
//         });
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleAddAddress = async () => {
//     if (!newAddress.trim()) {
//       notification.error({
//         message: 'Address cannot be empty.',
//       });
//       return;
//     }

//     setLoadingAddress(true);
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       // Make a request to save the new address to the backend
//       await axios.post(`http://localhost:5000/api/address/${user.id}`, { address: newAddress });
      
//       // Fetch the updated addresses
//       const addressesRes = await axios.get(`http://localhost:5000/api/address/user/${user.id}`);
//       setAddresses(addressesRes.data); // Update addresses state with the new address

//       setNewAddress(""); // Clear input field
//       notification.success({
//         message: 'Address added successfully!',
//       });
//     } catch (error) {
//       console.error('Error adding address:', error);
//       notification.error({
//         message: 'Error adding address. Please try again later.',
//       });
//     }
//     setLoadingAddress(false);
//   };

//   if (loading) {
//     return (
//       <div className="text-center" style={{ paddingTop: '50px' }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <Navbar />
//       <div style={{ padding: 20 }}>
//         <Card
//           title={<Title level={2}>🧑‍🦱 Personal Details</Title>}
//           bordered
//           style={{ marginBottom: '30px' }}
//         >
//           {userDetails ? (
//             <div>
//               <Text strong>Name: </Text>
//               <Text>{userDetails.name}</Text>
//               <br />
//               <Text strong>Email: </Text>
//               <Text>{userDetails.email}</Text>
//               <br />
//               <Text strong>Address: </Text>
//               <Text>{userDetails.address}</Text>
//               {/* Add more fields if needed */}
//             </div>
//           ) : (
//             <Text>No personal details available.</Text>
//           )}
//         </Card>

//         {/* Addresses Section */}
//         <Card
//           title={<Title level={2}>🏠 Saved Addresses</Title>}
//           bordered
//           style={{ marginBottom: '30px' }}
//         >
//           <div>
//             <Form.Item label="Add New Address">
//               <Input
//                 value={newAddress}
//                 onChange={(e) => setNewAddress(e.target.value)}
//                 placeholder="Enter new address"
//               />
//             </Form.Item>
//             <Button
//               type="primary"
//               onClick={handleAddAddress}
//               loading={loadingAddress}
//             >
//               Add Address
//             </Button>
//           </div>

//           <List
//             itemLayout="vertical"
//             size="large"
//             dataSource={addresses}
//             renderItem={(address) => (
//               <List.Item key={address.id}>
//                 <List.Item.Meta title={`Address #${address.id}`} />
//                 <Text>{address.address}</Text>
//               </List.Item>
//             )}
//           />
//         </Card>

//         <Card
//           title={<Title level={2}>📦 Order Details</Title>}
//           bordered
//         >
//           {orders.length > 0 ? (
//             <List
//               itemLayout="vertical"
//               size="large"
//               dataSource={orders}
//               renderItem={(order) => (
//                 <List.Item
//                   key={order.id}
//                   extra={
//                     <Button
//                       type="primary"
//                       onClick={() => navigate(`/order/${order.id}`)}
//                     >
//                       View Order
//                     </Button>
//                   }
//                 >
//                   <List.Item.Meta
//                     title={`Order #${order.id}`}
//                     description={`Date: ${new Date(order.order_date).toLocaleDateString()}`}
//                   />
//                   <Text>Status: {order.order_status}</Text>
//                   <br />
//                   <Text>Total: ₹{order.total_amount}</Text>
//                 </List.Item>
//               )}
//             />
//           ) : (
//             <Text>You have no orders yet.</Text>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;











import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Spin, List, Typography, notification, Input, Form } from 'antd';
import Navbar from '../components/Navbar';
import axios from 'axios';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]); // New state for saved addresses
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState(""); // State to manage the new address input
  const [loadingAddress, setLoadingAddress] = useState(false); // State to manage address loading

  // Fetch user details, orders, and addresses when component mounts
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user); // Log the user object for debugging

    // Handle case when user is not found
    if (!user || !user.id) {
      notification.error({
        message: 'Please login to view your profile.',
      });
      navigate('/login');
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        // Fetch user details from the backend
        const userRes = await axios.get(`http://localhost:5000/api/user/${user.id}`);
        setUserDetails(userRes.data);

        // Fetch user's order details
        const ordersRes = await axios.get(`http://localhost:5000/api/order/user/${user.id}`);
        setOrders(ordersRes.data);

        // Fetch user's saved addresses
        const addressesRes = await axios.get(`http://localhost:5000/api/address/user/${user.id}`);
        setAddresses(addressesRes.data); // Populate addresses state with fetched data
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        notification.error({
          message: 'Error fetching data. Please try again later.',
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleAddAddress = async () => {
    if (!newAddress.trim()) {
      notification.error({
        message: 'Address cannot be empty.',
      });
      return;
    }

    setLoadingAddress(true);
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      // Make a request to save the new address to the backend
      await axios.post(`http://localhost:5000/api/address/${user.id}`, { address: newAddress });
      
      // Fetch the updated addresses
      const addressesRes = await axios.get(`http://localhost:5000/api/address/user/${user.id}`);
      setAddresses(addressesRes.data); // Update addresses state with the new address

      setNewAddress(""); // Clear input field
      notification.success({
        message: 'Address added successfully!',
      });
    } catch (error) {
      console.error('Error adding address:', error);
      notification.error({
        message: 'Error adding address. Please try again later.',
      });
    }
    setLoadingAddress(false);
  };

  if (loading) {
    return (
      <div className="text-center" style={{ paddingTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Navbar />
      <div style={{ padding: 20 }}>
        <Card
          title={<Title level={2}>🧑‍🦱 Personal Details</Title>}
          bordered
          style={{ marginBottom: '30px' }}
        >
          {userDetails ? (
            <div>
              <Text strong>Name: </Text>
              <Text>{userDetails.name}</Text>
              <br />
              <Text strong>Email: </Text>
              <Text>{userDetails.email}</Text>
              <br />
              <Text strong>Address: </Text>
              <Text>{userDetails.address}</Text>
              {/* Add more fields if needed */}
            </div>
          ) : (
            <Text>No personal details available.</Text>
          )}
        </Card>

        {/* Addresses Section */}
        <Card
          title={<Title level={2}>🏠 Saved Addresses</Title>}
          bordered
          style={{ marginBottom: '30px' }}
        >
          <div>
            <Form.Item label="Add New Address">
              <Input
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter new address"
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={handleAddAddress}
              loading={loadingAddress}
            >
              Add Address
            </Button>
          </div>

          <List
            itemLayout="vertical"
            size="large"
            dataSource={addresses}
            renderItem={(address) => (
              <List.Item key={address.id}>
                <List.Item.Meta title={`Address #${address.id}`} />
                <Text>{address.address}</Text>
              </List.Item>
            )}
          />
        </Card>

        <Card
          title={<Title level={2}>📦 Order Details</Title>}
          bordered
        >
          {orders.length > 0 ? (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={orders}
              renderItem={(order) => (
                <List.Item
                  key={order.id}
                  extra={
                    <Button
                      type="primary"
                      onClick={() => navigate(`/order/${order.id}`)}
                    >
                      View Order
                    </Button>
                  }
                >
                  <List.Item.Meta
                    title={`Order #${order.id}`}
                    description={`Date: ${new Date(order.order_date).toLocaleDateString()}`}
                  />
                  <Text>Status: {order.order_status}</Text>
                  <br />
                  <Text>Total: ₹{order.total_amount}</Text>
                </List.Item>
              )}
            />
          ) : (
            <Text>You have no orders yet.</Text>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
