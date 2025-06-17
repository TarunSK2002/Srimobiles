// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Input, Button, Select, Upload, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const { Option } = Select;

// function AddProductPage() {
//   const [form] = Form.useForm();
//   const [imageFile, setImageFile] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (values) => {
//     const { name, actual_price, stock, measurement_unit } = values;

//     if (!imageFile) {
//       message.error('Please upload an image.');
//       return;
//     }

//     const payload = new FormData();
//     payload.append('name', name);
//     payload.append('actual_price', actual_price);
//     payload.append('stock', stock || '');
//     payload.append('measurement_unit', measurement_unit);
//     payload.append('image', imageFile.originFileObj); // Append the actual file

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
//         form={form}
//         onFinish={handleSubmit}
//         style={{ maxWidth: '600px', margin: '0 auto' }}
//       >
//         <Form.Item
//           label="Product Name"
//           name="name"
//           rules={[{ required: true, message: 'Please input the product name!' }]}
//         >
//           <Input placeholder="Enter product name" />
//         </Form.Item>

//         <Form.Item
//           label="Price"
//           name="actual_price"
//           rules={[{ required: true, message: 'Please input the product price!' }]}
//         >
//           <Input type="number" placeholder="Enter product price" />
//         </Form.Item>

//         <Form.Item label="Stock (optional)" name="stock">
//           <Input type="number" placeholder="Enter stock (optional)" />
//         </Form.Item>

//         <Form.Item
//           label="Measurement Unit"
//           name="measurement_unit"
//           rules={[{ required: true, message: 'Please select a measurement unit!' }]}
//         >
//           <Select placeholder="Select units">
//             <Option value="Kg">Kg</Option>
//             <Option value="G">G</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Upload Image">
//           <Upload
//             listType="picture"
//             accept="image/*"
//             beforeUpload={() => false} // Prevent auto-upload
//             maxCount={1}
//             showUploadList={{ showRemoveIcon: true }}
//             onChange={({ fileList }) => setImageFile(fileList[0])}
//           >
//             <Button icon={<UploadOutlined />}>Click to Upload</Button>
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




























import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Typography,
  Divider,
  message,
  Row,
  Col,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
const { Title, Text } = Typography;

const categories = [
  { name: "MOBILE", icon: "📱" },
  { name: "ELECTRONICS", icon: "💻" },
  { name: "APPLIANCES", icon: "🔌" },
  { name: "MOBILE GADGETS", icon: "🎧" },
];

const subcategories = {
  MOBILE: ["Smartphone", "Feature Phone", "5G Phone"],
  ELECTRONICS: ["Laptops", "Desktops", "Monitors", "Printers"],
  APPLIANCES: ["Microwave", "Refrigerator", "Washing Machine"],
  "MOBILE GADGETS": ["Headphones", "Power Banks", "Chargers", "Smartwatches"],
};

const AddProduct = () => {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Limit max 8 images
  const handleUploadChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 8) {
      message.warning("You can upload up to 8 images only.");
      return;
    }
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one product image");
      return;
    }

    // Trim string inputs to avoid accidental spaces
    const trimmedValues = {
      ...values,
      brand: values.brand.trim(),
      model: values.model.trim(),
      color: values.color.trim(),
      storage: values.storage.trim(),
      ram: values.ram.trim(),
      productName: values.productName.trim(),
      category: values.category,
      subcategory: values.subcategory,
      actual_price: values.actual_price,
      stock: values.stock === undefined || values.stock === "" ? 0 : values.stock,
    };

    const formData = new FormData();
    formData.append("brand", trimmedValues.brand);
    formData.append("model", trimmedValues.model);
    formData.append("color", trimmedValues.color);
    formData.append("storage", trimmedValues.storage);
    formData.append("ram", trimmedValues.ram);
    formData.append("productName", trimmedValues.productName);
    formData.append("category", trimmedValues.category);
    formData.append("subcategory", trimmedValues.subcategory);
    formData.append("actual_price", trimmedValues.actual_price);
    formData.append("stock", trimmedValues.stock);

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        message.success("Product added successfully!");
        form.resetFields();
        setFileList([]);
        setSelectedCategory(null);
      } else {
        message.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get icon for selected category
  const selectedCategoryIcon =
    categories.find((cat) => cat.name === selectedCategory)?.icon || "";

  return (
    <div
      style={{
        background: "#f0f2f5",
        minHeight: "100vh",
        padding: "20px 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          height: "600px",
          overflowY: "auto",
          padding: "40px 50px",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          Add New Product
        </Title>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          scrollToFirstError
        >
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>Brand</Text>}
                name="brand"
                rules={[{ required: true, message: "Please enter the brand" }]}
              >
                <Input placeholder="e.g., Tecno" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>Model</Text>}
                name="model"
                rules={[{ required: true, message: "Please enter the model" }]}
              >
                <Input placeholder="e.g., Pova Curve 5G" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>Color</Text>}
                name="color"
                rules={[{ required: true, message: "Please enter the color" }]}
              >
                <Input placeholder="e.g., Geek Black" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>Storage Capacity</Text>}
                name="storage"
                rules={[
                  { required: true, message: "Please enter storage capacity" },
                ]}
              >
                <Input placeholder="e.g., 128 GB" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>RAM</Text>}
                name="ram"
                rules={[{ required: true, message: "Please enter RAM size" }]}
              >
                <Input placeholder="e.g., 6 GB" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>Product Name</Text>}
                name="productName"
                rules={[
                  { required: true, message: "Please enter product name" },
                ]}
                extra="E.g., Tecno Pova Curve 5G (Geek Black, 128 GB) (6 GB RAM)"
              >
                <Input placeholder="Full product name" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>Category</Text>}
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select
                  placeholder="Select Category"
                  size="large"
                  onChange={(value) => {
                    setSelectedCategory(value);
                    form.setFieldsValue({ subcategory: null });
                  }}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {categories.map((cat) => (
                    <Option key={cat.name} value={cat.name}>
                      {cat.icon} {cat.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>Subcategory</Text>}
                name="subcategory"
                rules={[
                  { required: true, message: "Please select subcategory" },
                ]}
              >
                <Select
                  placeholder="Select Subcategory"
                  size="large"
                  disabled={!selectedCategory}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {(selectedCategory && subcategories[selectedCategory])?.map(
                    (subcat) => (
                      <Option key={subcat} value={subcat}>
                        {selectedCategoryIcon} {subcat}
                      </Option>
                    )
                  ) || []}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={<Text strong>Actual Price</Text>}
                name="actual_price"
                rules={[
                  { required: true, message: "Please enter actual price" },
                ]}
              >
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="Enter price"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={<Text strong>Stock Quantity</Text>} name="stock">
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter stock quantity"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label={<Text strong>Product Images</Text>} name="images">
                <Upload
                  listType="picture-card"
                  multiple
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  accept="image/*"
                >
                  {fileList.length < 8 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 30 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;
