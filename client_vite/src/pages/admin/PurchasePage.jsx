// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

// function PurchasePage() {
//   const [purchases, setPurchases] = useState([]);
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Fetch all purchases
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/purchases/all')
//       .then((response) => {
//         setPurchases(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching purchases:', error);
//       });
//   }, []);

//   const handleAddPurchase = () => {
//     // Use navigate to go to the Add Purchase page
//     navigate('/admin/purchase/add');
//   };

//   return (
//     <div>
//       <h2>Purchase Details</h2>
//       <button onClick={handleAddPurchase}>Add Purchase</button>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Product Name</th>
//             <th>Dealer ID</th>
//             <th>Dealer Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {purchases.map((purchase) => (
//             <tr key={purchase.id}>
//               <td>{purchase.product_id}</td>
//               <td>{purchase.product_name}</td>
//               <td>{purchase.dealer_id}</td>
//               <td>{purchase.dealer_name}</td>
//               <td>{purchase.quantity}</td>
//               <td>{purchase.purchase_price}</td>
//               <td>{new Date(purchase.created_at).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PurchasePage;






























// PurchasePage.js
import React, { useEffect, useState } from 'react';
import { Button, Table, Card, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PurchasePage = () => {
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

  // Fetch all purchases
  useEffect(() => {
    axios.get('http://localhost:5000/api/purchases/all')
      .then((response) => {
        setPurchases(response.data);
      })
      .catch((error) => {
        console.error('Error fetching purchases:', error);
        notification.error({
          message: 'Error fetching purchases',
          description: 'There was an issue fetching the purchases. Please try again later.',
        });
      });
  }, []);

  const handleAddPurchase = () => {
    navigate('/admin/purchase/add');
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Dealer ID',
      dataIndex: 'dealer_id',
      key: 'dealer_id',
    },
    {
      title: 'Dealer Name',
      dataIndex: 'dealer_name',
      key: 'dealer_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'purchase_price',
      key: 'purchase_price',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div className="container">
      <Card
        title="Purchase Details"
        extra={<Button type="primary" onClick={handleAddPurchase}>Add Purchase</Button>}
      >
        <Table
          columns={columns}
          dataSource={purchases}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default PurchasePage;
