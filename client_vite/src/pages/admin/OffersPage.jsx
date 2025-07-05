import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Modal,
  Switch,
  Popconfirm,
  Table,
  Space,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const OffersPage = () => {
  const [form] = Form.useForm();
  const [offers, setOffers] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/offers/all");
      setOffers(res.data);
    } catch (err) {
      console.error("Fetch Offers Error:", err);
      message.error("Failed to fetch offers");
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    form.resetFields();
    setImageFile(null);
  };

  const handleSubmit = async (values) => {
    if (!imageFile) {
      message.error("Please upload an offer image.");
      return;
    }

    const payload = new FormData();
    payload.append("title", values.title);
    payload.append("description", values.description || "");
    payload.append("start_date", values.start_date);
    payload.append("end_date", values.end_date);
    payload.append("image", imageFile.originFileObj);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/offers/add", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        message.success("Offer added successfully!");
        fetchOffers();
        handleCancel();
      } else {
        message.error("Failed to add offer");
      }
    } catch (err) {
      console.error("Add Offer Error:", err);
      message.error("Error adding offer");
    } finally {
      setLoading(false);
    }
  };

  const toggleOfferStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/offers/status/${id}`, {
        active: !currentStatus,
      });
      message.success("Offer status updated");
      fetchOffers();
    } catch (err) {
      console.error("Status Toggle Error:", err);
      message.error("Failed to update status");
    }
  };

  const deleteOffer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/offers/${id}`);
      message.success("Offer deleted");
      fetchOffers();
    } catch (err) {
      console.error("Delete Offer Error:", err);
      message.error("Failed to delete offer");
    }
  };

  const columns = [
    {
      title: "Banner",
      dataIndex: "image",
      key: "image",
      render: (img) => (
        <img
          src={`http://localhost:5000/uploads/offers/${img}`}
          crossOrigin="ananymous"
          alt="offer"
          style={{ width: 300, height: 80, objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    {
      title: "Offer Name & Description",
      key: "title",
      render: (record) => (
        <div>
          <strong>{record.title}</strong>
          <p style={{ marginBottom: 0 }}>{record.description}</p>
        </div>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={() => toggleOfferStatus(record.id, active)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this offer?"
          onConfirm={() => deleteOffer(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="container mt-4" style={{ maxWidth: 2000, margin: "auto" }}>
      <h2 className="mb-4">Offers Management</h2>

      {!showAddForm && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddClick}
          style={{ marginBottom: 20 }}
        >
          Add New Offer
        </Button>
      )}

      {showAddForm && (
        <Modal
          open={showAddForm}
          title="Add New Offer"
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
          style={{ top: 50 }}
        >
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter offer title!" }]}
            >
              <Input placeholder="Enter offer title" />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={3} placeholder="Offer description (optional)" />
            </Form.Item>

            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <Input type="date" min={new Date().toISOString().split("T")[0]} />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="end_date"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <Input type="date" min={new Date().toISOString().split("T")[0]} />
            </Form.Item>

            <Form.Item label="Upload Image" required>
              <Upload
                listType="picture"
                accept="image/*"
                beforeUpload={() => false}
                maxCount={1}
                onChange={({ fileList }) =>
                  setImageFile(fileList.length > 0 ? fileList[0] : null)
                }
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Add Offer
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      <Table
        dataSource={offers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default OffersPage;
