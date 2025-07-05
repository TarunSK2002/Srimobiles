import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Space, Tag } from 'antd';  // Ant Design components
import { Container } from 'react-bootstrap'; // Bootstrap component

function DealerPage() {
  const [dealers, setDealers] = useState([]);
  const navigate = useNavigate();

  const fetchDealers = () => {
    fetch('http://localhost:5000/api/dealers/all')
      .then(res => res.json())
      .then(data => setDealers(data))
      .catch(err => console.error('Error fetching dealers:', err));
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await fetch('http://localhost:5000/api/dealers/toggle-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealer_id: id, is_active: !currentStatus }),
      });

      if (res.ok) {
        fetchDealers(); // Refresh data
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'dealer_id',
      key: 'dealer_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (text) => (
        <Tag color={text ? 'green' : 'red'}>
          {text ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => toggleStatus(record.dealer_id, record.is_active)}
            type={record.is_active ? 'danger' : 'primary'}
          >
            {record.is_active ? 'Deactivate' : 'Activate'}
          </Button>
        </Space>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div>
      <Container style={{ paddingTop: '20px' }}>
        <h2>Manage Dealers</h2>
        <Button
          type="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => navigate('/admin/dealers/add')}
        >
          Add Dealer
        </Button>

        <Table
          columns={columns}
          dataSource={dealers}
          rowKey="dealer_id"
          pagination={false}
          bordered
        />
      </Container>
    </div>
  );
}

export default DealerPage;
