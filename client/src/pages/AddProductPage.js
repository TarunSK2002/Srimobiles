// // src/pages/AddProduct.js

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function AddProductPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     actual_price: '',
//     stock: '',
//     measurement_unit: 'Select Units',
//     image: null,
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, image: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.measurement_unit === 'Select Units') {
//       alert('Please select a measurement unit.');
//       return;
//     }

//     const payload = new FormData();
//     payload.append('name', formData.name);
//     payload.append('actual_price', formData.actual_price);
//     payload.append('stock', formData.stock);
//     payload.append('measurement_unit', formData.measurement_unit);
//     payload.append('image', formData.image); // This is a File object

//     try {
//       const res = await axios.post('http://localhost:5000/api/products/add', payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (res.status === 200) {
//         alert('Product added successfully!');
//         navigate('/admin/products');
//       } else {
//         alert('Failed to add product');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error adding product');
//     }
//   };

//   return (
//     <div>
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div>
//           <label>Product Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input type="number" name="actual_price" value={formData.actual_price} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Stock (optional):</label>
//           <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Measurement Unit:</label>
//           <select name="measurement_unit" value={formData.measurement_unit} onChange={handleChange} required>
//             <option value="Select Units">Select Units</option>
//             <option value="Kg">Kg</option>
//             <option value="G">G</option>
//           </select>
//         </div>
//         <div>
//           <label>Upload Image:</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} required />
//         </div>
//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// }

// export default AddProductPage;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Input, Button, Select, Upload, message } from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// const { Option } = Select;

// function AddProductPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     actual_price: '',
//     stock: '',
//     measurement_unit: '',
//     image: null,
//   });
//   const navigate = useNavigate();

//   const handleChange = (value, name) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = ({ fileList }) => {
//     setFormData((prev) => ({ ...prev, image: fileList[0] }));
//   };

//   const handleSubmit = async (values) => {
//     const { name, actual_price, stock, measurement_unit, image } = values;

//     if (!measurement_unit) {
//       message.error('Please select a measurement unit.');
//       return;
//     }

//     const payload = new FormData();
//     payload.append('name', name);
//     payload.append('actual_price', actual_price);
//     payload.append('stock', stock);
//     payload.append('measurement_unit', measurement_unit);
//     if (image) payload.append('image', image.originFileObj); // Ensure it's a File object

//     try {
//       const res = await axios.post('http://localhost:5000/api/products/add', payload, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (res.status === 200) {
//         message.success('Product added successfully!');
//         navigate('/admin/products');
//       } else {
//         message.error('Failed to add product');
//       }
//     } catch (err) {
//       console.error(err);
//       message.error('Error adding product');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Add Product</h2>
//       <Form
//         layout="vertical"
//         onFinish={handleSubmit}
//         initialValues={formData}
//         style={{ maxWidth: '600px', margin: '0 auto' }}
//       >
//         <Form.Item
//           label="Product Name"
//           name="name"
//           rules={[{ required: true, message: 'Please input the product name!' }]}
//         >
//           <Input
//             value={formData.name}
//             onChange={(e) => handleChange(e.target.value, 'name')}
//             placeholder="Enter product name"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Price"
//           name="actual_price"
//           rules={[{ required: true, message: 'Please input the product price!' }]}
//         >
//           <Input
//             type="number"
//             value={formData.actual_price}
//             onChange={(e) => handleChange(e.target.value, 'actual_price')}
//             placeholder="Enter product price"
//           />
//         </Form.Item>

//         <Form.Item label="Stock (optional)" name="stock">
//           <Input
//             type="number"
//             value={formData.stock}
//             onChange={(e) => handleChange(e.target.value, 'stock')}
//             placeholder="Enter stock"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Measurement Unit"
//           name="measurement_unit"
//           rules={[{ required: true, message: 'Please select a measurement unit!' }]}
//         >
//           <Select
//             value={formData.measurement_unit}
//             onChange={(value) => handleChange(value, 'measurement_unit')}
//             placeholder="Select units"
//           >
//             <Option value="Kg">Kg</Option>
//             <Option value="G">G</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Upload Image" name="image" valuePropName="fileList" getValueFromEvent={handleImageChange}>
//           <Upload
//             listType="picture"
//             accept="image/*"
//             beforeUpload={() => false} // Prevent automatic upload
//             maxCount={1}
//             showUploadList={false}
//           >
//             <Button>Click to Upload</Button>
//           </Upload>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             Add Product
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default AddProductPage;


















import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Option } = Select;

function AddProductPage() {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { name, actual_price, stock, measurement_unit } = values;

    if (!imageFile) {
      message.error('Please upload an image.');
      return;
    }

    const payload = new FormData();
    payload.append('name', name);
    payload.append('actual_price', actual_price);
    payload.append('stock', stock || '');
    payload.append('measurement_unit', measurement_unit);
    payload.append('image', imageFile.originFileObj); // Append the actual file

    try {
      const res = await axios.post('http://localhost:5000/api/products/add', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        message.success('Product added successfully!');
        navigate('/admin/products');
      } else {
        message.error('Failed to add product');
      }
    } catch (err) {
      console.error(err);
      message.error('Error adding product');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Product</h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="actual_price"
          rules={[{ required: true, message: 'Please input the product price!' }]}
        >
          <Input type="number" placeholder="Enter product price" />
        </Form.Item>

        <Form.Item label="Stock (optional)" name="stock">
          <Input type="number" placeholder="Enter stock (optional)" />
        </Form.Item>

        <Form.Item
          label="Measurement Unit"
          name="measurement_unit"
          rules={[{ required: true, message: 'Please select a measurement unit!' }]}
        >
          <Select placeholder="Select units">
            <Option value="Kg">Kg</Option>
            <Option value="G">G</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            listType="picture"
            accept="image/*"
            beforeUpload={() => false} // Prevent auto-upload
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
            onChange={({ fileList }) => setImageFile(fileList[0])}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddProductPage;
