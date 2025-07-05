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
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title, Text } = Typography;

const categories = [
  { name: "MOBILE", icon: "📱" },
  { name: "ELECTRONICS", icon: "💻" },
  { name: "APPLIANCES", icon: "🔌" },
  { name: "MOBILE GADGETS", icon: "🎧" },
  { name: "sample", icon: "🎧" },
];

const subcategories = {
  MOBILE: ["Smartphone", "Feature Phone", "5G Phone"],
  ELECTRONICS: ["Laptops", "Desktops", "Monitors", "Printers"],
  APPLIANCES: ["Microwave", "Refrigerator", "Washing Machine"],
  "MOBILE GADGETS": ["Headphones", "Power Banks", "Chargers", "Smartwatches"],
  sample: ["joystick", "ps5"],
};

const AddProduct = () => {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(form);
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

    const trimmedValues = {
      ...values,
      brand: values.brand?.trim(),
      model: values.model?.trim(),
      color: values.color?.trim(),
      storage: values.storage?.trim(),
      ram: values.ram?.trim(),
      productName: values.productName.trim(),
      category: values.category,
      subcategory: values.subcategory,
      actual_price: values.actual_price,
      stock: values.stock === undefined || values.stock === "" ? 0 : values.stock,
      // Add PS5 specific fields if they exist
      ps5Version: values.ps5Version?.trim(),
      joysticks: values.joysticks?.trim(),
      cover: values.cover?.trim(),
    };

    const formData = new FormData();
    Object.entries(trimmedValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

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
      console.log(response, "response");
      if (response.status === 201) {
        message.success('Product added successfully!');
        setTimeout(() => navigate('/admin/products'), 1000);
        form.resetFields();
        setFileList([]);
        setSelectedCategory(null);
        setSelectedSubcategory(null);
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

  const selectedCategoryIcon =
    categories.find((cat) => cat.name === selectedCategory)?.icon || "";

  // Check if PS5 subcategory is selected
  const isPS5Selected = selectedCategory === "sample" && selectedSubcategory === "ps5";

  return (
    <div style={{
      background: "#f0f2f5",
      minHeight: "100vh",
      padding: "20px 10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    }}>
      <Card style={{
        width: "100%",
        maxWidth: 1200,
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        height: "600px",
        overflowY: "auto",
        padding: "40px 50px",
      }}>
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
                label={<Text strong>Category</Text>}
                name="category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select
                  placeholder="Select Category"
                  size="large"
                  onChange={(value) => {
                    setSelectedCategory(value);
                    setSelectedSubcategory(null);
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

            
            {selectedCategory && (
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
                    onChange={(value) => setSelectedSubcategory(value)}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    {subcategories[selectedCategory]?.map((subcat) => (
                      <Option key={subcat} value={subcat}>
                        {selectedCategoryIcon} {subcat}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

            {/* Show all other fields only when subcategory is selected */}
            {selectedSubcategory && (
              <>
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

                {/* Show PS5 specific fields if PS5 is selected */}
                {isPS5Selected ? (
                  <>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={<Text strong>PS5 Version</Text>}
                        name="ps5Version"
                        rules={[{ required: true, message: "Please enter PS5 version" }]}
                      >
                        <Input placeholder="e.g., Standard, Digital Edition" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={<Text strong>Number of Joysticks</Text>}
                        name="joysticks"
                        rules={[{ required: true, message: "Please enter number of joysticks" }]}
                      >
                        <Input placeholder="e.g., 1, 2" size="large" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={<Text strong>Cover Type</Text>}
                        name="cover"
                        rules={[{ required: true, message: "Please enter cover type" }]}
                      >
                        <Input placeholder="e.g., Included, Not Included" size="large" />
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  <>
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
                  </>
                )}

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
              </>
            )}
          </Row>

          <Form.Item style={{ justifySelf: "center",marginTop: 30 , width:"50%"}}>
 
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