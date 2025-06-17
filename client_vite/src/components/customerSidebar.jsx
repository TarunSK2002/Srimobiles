// /components/Sidebar.jsx
import React from 'react';
import { Menu, Avatar } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';

const customerSidebar = () => {
  return (
    <div style={{ width: '100%', padding: '24px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar size={64} icon={<UserOutlined />} />
        <div style={{ marginTop: 10, fontWeight: 600 }}>Hello, Tarun</div>
      </div>
      <Menu mode="inline" defaultSelectedKeys={['manageAddresses']}>
        <Menu.Item key="orders" icon={<HomeOutlined />}>My Orders</Menu.Item>
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
    </div>
  );
};

export default customerSidebar;
