// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [offerPercentage, setOfferPercentage] = useState(0); // Local state for offer percentage
//   const [selectedProductId, setSelectedProductId] = useState(null); // Track selected product for offer
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products/all')
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   const handleAddProduct = () => {
//     navigate('/admin/products/add');
//   };

//   const handleApplyOffer = (productId) => {
//     // Apply the offer for a selected product
//     axios.put(`http://localhost:5000/api/products/update-offer/${productId}`, { offer_percentage: offerPercentage })
//       .then((response) => {
//         alert('Offer updated successfully!');
//         setOfferPercentage(0); // Reset the input after applying the offer
//         setSelectedProductId(null); // Reset selected product

//         // Optionally, you can fetch updated products list after offer is applied
//         axios.get('http://localhost:5000/api/products/all')
//           .then((res) => {
//             setProducts(res.data);
//           });
//       })
//       .catch((error) => {
//         console.error('Error updating offer:', error);
//         alert('Failed to update offer.');
//       });
//   };

//   return (
//     <div>
//       <h2>Manage Products</h2>
//       <button onClick={handleAddProduct} style={{ marginBottom: '15px' }}>
//         Add Product
//       </button>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Product ID</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Offer Price</th> {/* Show offer price */}
//             <th>Stock</th>
//             <th>Unit</th>
//             <th>Offer</th> {/* New column to input offer percentage */}
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((prod) => {
//             // const offerPrice = prod.actual_price - (prod.actual_price * prod.offer_percentage) / 100;
//             const offer = prod.offer_percentage || 0;
//             const offerPrice = prod.actual_price - (prod.actual_price * offer) / 100;


//             return (
//               <tr key={prod.product_id}>
//                 <td>
//                   {prod.image ? (
//                     <img
//                     src={`http://localhost:5000/uploads/${prod.image}`}
//                     alt={prod.name}
//                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                   />                  
//                   ) : (
//                     'No image'
//                   )}
//                 </td>
//                 <td>{prod.product_id}</td>
//                 <td>{prod.name}</td>
//                 <td>{prod.actual_price}</td>
//                 <td>{offerPrice.toFixed(2)}</td> {/* Show the calculated offer price */}
//                 <td>{prod.stock ?? 'N/A'}</td>
//                 <td>{prod.measurement_unit}</td>
//                 <td>
//                   <input
//                     type="number"
//                     min="0"
//                     max="100"
//                     value={selectedProductId === prod.product_id ? offerPercentage : ''}
//                     onChange={(e) => {
//                       setOfferPercentage(e.target.value);
//                       setSelectedProductId(prod.product_id); // Set selected product for offer
//                     }}
//                   />
//                   <button onClick={() => handleApplyOffer(prod.product_id)}>Apply Offer</button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ProductPage;





















import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Input, Button, notification, Form } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap
import 'antd/dist/reset.css';  // Import Ant Design

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [offerPercentage, setOfferPercentage] = useState(0); // Local state for offer percentage
  const [selectedProductId, setSelectedProductId] = useState(null); // Track selected product for offer
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/all')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  const handleApplyOffer = (productId) => {
    // Apply the offer for a selected product
    axios.put(`http://localhost:5000/api/products/update-offer/${productId}`, { offer_percentage: offerPercentage })
      .then((response) => {
        notification.success({ message: 'Offer updated successfully!' });
        setOfferPercentage(0); // Reset the input after applying the offer
        setSelectedProductId(null); // Reset selected product

        // Optionally, you can fetch updated products list after offer is applied
        axios.get('http://localhost:5000/api/products/all')
          .then((res) => {
            setProducts(res.data);
          });
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
        ) : 'No image'
      ),
    },
    { title: 'Product ID', dataIndex: 'product_id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Price', dataIndex: 'actual_price' },
    {
      title: 'Offer Price',
      render: (text, record) => {
        const offer = record.offer_percentage || 0;
        const offerPrice = record.actual_price - (record.actual_price * offer) / 100;
        return offerPrice.toFixed(2);
      },
    },
    { title: 'Stock', dataIndex: 'stock', render: (text) => text ?? 'N/A' },
    { title: 'Unit', dataIndex: 'measurement_unit' },
    {
      title: 'Offer',
      render: (text, record) => (
        <Form.Item>
          <Input
            type="number"
            min="0"
            max="100"
            value={selectedProductId === record.product_id ? offerPercentage : ''}
            onChange={(e) => {
              setOfferPercentage(e.target.value);
              setSelectedProductId(record.product_id); // Set selected product for offer
            }}
            style={{ width: '80px', marginRight: '10px' }}
          />
          <Button type="primary" onClick={() => handleApplyOffer(record.product_id)}>
            Apply Offer
          </Button>
        </Form.Item>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <Button
        className="mb-3"
        onClick={handleAddProduct}
        type="primary"
      >
        Add Product
      </Button>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="product_id"
        pagination={false}
      />
    </div>
  );
}

export default ProductPage;
