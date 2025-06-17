// import React, { useState } from 'react';
// import axios from 'axios';

// function AddPurchasePage() {
//   const [formData, setFormData] = useState({
//     product_id: '',
//     product_name: '',
//     dealer_id: '',
//     dealer_name: '',
//     quantity: 0,
//     purchase_price: '',
//   });

//   const handleProductIdChange = (e) => {
//     setFormData((prev) => ({ ...prev, product_id: e.target.value }));
//   };

//   const handleDealerIdChange = (e) => {
//     setFormData((prev) => ({ ...prev, dealer_id: e.target.value }));
//   };

//   const handleProductIdBlur = () => {
//     const { product_id } = formData;

//     if (product_id) {
//       axios.get(`http://localhost:5000/api/products/${product_id}`)
//         .then((res) => {
//           if (res.data?.name) {
//             setFormData((prev) => ({
//               ...prev,
//               product_name: res.data.name,
//             }));
//           } else {
//             setFormData((prev) => ({ ...prev, product_name: '' }));
//             alert('Product not found');
//           }
//         })
//         .catch(() => {
//           setFormData((prev) => ({ ...prev, product_name: '' }));
//           alert('Product not found');
//         });
//     }
//   };

//   const handleDealerIdBlur = () => {
//     const { dealer_id } = formData;

//     if (dealer_id) {
//       axios.get(`http://localhost:5000/api/dealers/get/${dealer_id}`)
//         .then((res) => {
//           if (res.data?.name) {
//             setFormData((prev) => ({
//               ...prev,
//               dealer_name: res.data.name,
//             }));
//           } else {
//             setFormData((prev) => ({ ...prev, dealer_name: '' }));
//             alert('Dealer not found');
//           }
//         })
//         .catch(() => {
//           setFormData((prev) => ({ ...prev, dealer_name: '' }));
//           alert('Dealer not found');
//         });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { product_id, dealer_id, quantity, purchase_price } = formData;

//     if (!product_id || !dealer_id || !quantity || !purchase_price) {
//       alert('Please fill all required fields');
//       return;
//     }

//     axios.post('http://localhost:5000/api/purchases/add', formData)
//       .then(() => {
//         alert('Purchase added successfully');

//         axios.put(`http://localhost:5000/api/products/update-stock/${product_id}`, {
//           quantity: Number(quantity),
//         })
//           .then(() => {
//             alert('Stock updated successfully');
//             setFormData({
//               product_id: '',
//               product_name: '',
//               dealer_id: '',
//               dealer_name: '',
//               quantity: 0,
//               purchase_price: '',
//             });
//           })
//           .catch((err) => {
//             console.error('Error updating product stock:', err);
//             alert('Error updating stock');
//           });
//       })
//       .catch((err) => {
//         console.error('Error adding purchase:', err);
//         alert('Error adding purchase');
//       });
//   };

//   return (
//     <div>
//       <h2>Add New Purchase</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Product ID:</label>
//           <input
//             type="text"
//             value={formData.product_id}
//             onChange={handleProductIdChange}
//             onBlur={handleProductIdBlur}
//             required
//           />
//         </div>
//         <div>
//           <label>Product Name:</label>
//           <input type="text" value={formData.product_name} readOnly />
//         </div>
//         <div>
//           <label>Dealer ID:</label>
//           <input
//             type="text"
//             value={formData.dealer_id}
//             onChange={handleDealerIdChange}
//             onBlur={handleDealerIdBlur}
//             required
//           />
//         </div>
//         <div>
//           <label>Dealer Name:</label>
//           <input type="text" value={formData.dealer_name} readOnly />
//         </div>
//         <div>
//           <label>Quantity:</label>
//           <input
//             type="number"
//             value={formData.quantity}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, quantity: e.target.value }))
//             }
//             required
//           />
//         </div>
//         <div>
//           <label>Purchase Price:</label>
//           <input
//             type="number"
//             value={formData.purchase_price}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, purchase_price: e.target.value }))
//             }
//             required
//           />
//         </div>
//         <button type="submit">Add Purchase</button>
//       </form>
//     </div>
//   );
// }

// export default AddPurchasePage;



















// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Input, Button, message } from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// function AddPurchasePage() {
//   const [formData, setFormData] = useState({
//     product_id: '',
//     product_name: '',
//     dealer_id: '',
//     dealer_name: '',
//     quantity: 0,
//     purchase_price: '',
//   });

//   const handleProductIdChange = (e) => {
//     setFormData((prev) => ({ ...prev, product_id: e.target.value }));
//   };

//   const handleDealerIdChange = (e) => {
//     setFormData((prev) => ({ ...prev, dealer_id: e.target.value }));
//   };

//   const handleProductIdBlur = () => {
//     const { product_id } = formData;

//     if (product_id) {
//       axios.get(`http://localhost:5000/api/products/${product_id}`)
//         .then((res) => {
//           if (res.data?.name) {
//             setFormData((prev) => ({
//               ...prev,
//               product_name: res.data.name,
//             }));
//           } else {
//             setFormData((prev) => ({ ...prev, product_name: '' }));
//             message.error('Product not found');
//           }
//         })
//         .catch(() => {
//           setFormData((prev) => ({ ...prev, product_name: '' }));
//           message.error('Product not found');
//         });
//     }
//   };

//   const handleDealerIdBlur = () => {
//     const { dealer_id } = formData;

//     if (dealer_id) {
//       axios.get(`http://localhost:5000/api/dealers/get/${dealer_id}`)
//         .then((res) => {
//           if (res.data?.name) {
//             setFormData((prev) => ({
//               ...prev,
//               dealer_name: res.data.name,
//             }));
//           } else {
//             setFormData((prev) => ({ ...prev, dealer_name: '' }));
//             message.error('Dealer not found');
//           }
//         })
//         .catch(() => {
//           setFormData((prev) => ({ ...prev, dealer_name: '' }));
//           message.error('Dealer not found');
//         });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { product_id, dealer_id, quantity, purchase_price } = formData;

//     if (!product_id || !dealer_id || !quantity || !purchase_price) {
//       message.error('Please fill all required fields');
//       return;
//     }

//     axios.post('http://localhost:5000/api/purchases/add', formData)
//       .then(() => {
//         message.success('Purchase added successfully');

//         axios.put(`http://localhost:5000/api/products/update-stock/${product_id}`, {
//           quantity: Number(quantity),
//         })
//           .then(() => {
//             message.success('Stock updated successfully');
//             setFormData({
//               product_id: '',
//               product_name: '',
//               dealer_id: '',
//               dealer_name: '',
//               quantity: 0,
//               purchase_price: '',
//             });
//           })
//           .catch((err) => {
//             console.error('Error updating product stock:', err);
//             message.error('Error updating stock');
//           });
//       })
//       .catch((err) => {
//         console.error('Error adding purchase:', err);
//         message.error('Error adding purchase');
//       });
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Add New Purchase</h2>
//       <Form
//         layout="vertical"
//         onSubmitCapture={handleSubmit}
//         initialValues={formData}
//         style={{ maxWidth: '600px', margin: '0 auto' }}
//       >
//         <Form.Item
//           label="Product ID"
//           name="product_id"
//           rules={[{ required: true, message: 'Please input the product ID!' }]}
//         >
//           <Input
//             value={formData.product_id}
//             onChange={handleProductIdChange}
//             onBlur={handleProductIdBlur}
//             placeholder="Enter product ID"
//           />
//         </Form.Item>

//         <Form.Item label="Product Name" name="product_name">
//           <Input value={formData.product_name} readOnly />
//         </Form.Item>

//         <Form.Item
//           label="Dealer ID"
//           name="dealer_id"
//           rules={[{ required: true, message: 'Please input the dealer ID!' }]}
//         >
//           <Input
//             value={formData.dealer_id}
//             onChange={handleDealerIdChange}
//             onBlur={handleDealerIdBlur}
//             placeholder="Enter dealer ID"
//           />
//         </Form.Item>

//         <Form.Item label="Dealer Name" name="dealer_name">
//           <Input value={formData.dealer_name} readOnly />
//         </Form.Item>

//         <Form.Item
//           label="Quantity"
//           name="quantity"
//           rules={[{ required: true, message: 'Please input the quantity!' }]}
//         >
//           <Input
//             type="number"
//             value={formData.quantity}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, quantity: e.target.value }))
//             }
//             placeholder="Enter quantity"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Purchase Price"
//           name="purchase_price"
//           rules={[{ required: true, message: 'Please input the purchase price!' }]}
//         >
//           <Input
//             type="number"
//             value={formData.purchase_price}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, purchase_price: e.target.value }))
//             }
//             placeholder="Enter purchase price"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             Add Purchase
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default AddPurchasePage;


















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
            form.setFieldsValue({ product_name: res.data.name });
          } else {
            form.setFieldsValue({ product_name: '' });
            message.error('Product not found');
          }
        })
        .catch(() => {
          form.setFieldsValue({ product_name: '' });
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

        <Form.Item label="Product Name" name="product_name">
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
