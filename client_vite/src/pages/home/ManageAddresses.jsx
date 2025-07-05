import React from 'react';
import { Layout, Menu, Button, Card, Tag, Dropdown, Space, Avatar } from 'antd';
import { MoreOutlined, HomeOutlined, UserOutlined, CreditCardOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const addressList = [
  {
    type: 'HOME',
    name: 'Tarun',
    phone: '9489114403',
    address: 'C/o Garuda Electricals, Karur- Trichy highway, Karur, Tamil Nadu',
    pincode: '639004',
  },
  {
    type: 'WORK',
    name: 'Dinesh.R',
    phone: '7448382812',
    address: '87-4A/11, Joy Driving School, Trichy Main Road Gandhigramam, Karur, Tamil Nadu',
    pincode: '639004',
  },
  {
    type: 'HOME',
    name: 'Tarun',
    phone: '9444321544',
    address: 'C/o Garuda Electricals, Karur- Trichy highway, KARUR, Tamil Nadu',
    pincode: '639004',
  },
];

const menuItems = [
  {
    key: '1',
    label: 'Edit',
  },
  {
    key: '2',
    label: 'Delete',
  },
];

const ManageAddresses = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={260} style={{ background: '#fff', padding: '24px 16px' }}>
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 10, fontWeight: 600 }}>Hello, Tarun</div>
        </div>
        <Menu mode="inline" defaultSelectedKeys={['manageAddresses']}>
          <Menu.Item key="orders" icon={<HomeOutlined />}>
            My Orders
          </Menu.Item>
          <Menu.ItemGroup key="accountSettings" title="ACCOUNT SETTINGS">
            <Menu.Item key="profile">Profile Information</Menu.Item>
            <Menu.Item key="manageAddresses">Manage Addresses</Menu.Item>
            <Menu.Item key="pan">PAN Card Information</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="payments" title="PAYMENTS">
            <Menu.Item key="gift">Gift Cards</Menu.Item>
            <Menu.Item key="upi">Saved UPI</Menu.Item>
            <Menu.Item key="cards">Saved Cards</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px 40px' }}>
          <h2 style={{ marginBottom: 20 }}>Manage Addresses</h2>
          <Button type="primary" style={{ marginBottom: 20 }}>
            + ADD A NEW ADDRESS
          </Button>
          <Space direction="vertical" style={{ width: '100%' }}>
            {addressList.map((item, index) => (
              <Card
                key={index}
                style={{ width: '100%' }}
                actions={[
                  <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                    <MoreOutlined key="ellipsis" style={{ fontSize: 20 }} />
                  </Dropdown>,
                ]}
              >
                <Tag color="gray" style={{ fontWeight: 600 }}>{item.type}</Tag>
                <div style={{ fontWeight: 600 }}>{item.name} <span style={{ fontWeight: 400 }}>{item.phone}</span></div>
                <div>
                  {item.address} - <b>{item.pincode}</b>
                </div>
              </Card>
            ))}
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageAddresses;
