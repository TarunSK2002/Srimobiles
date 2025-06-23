import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const { Sider } = Layout;

// Define the menu items with label as React node (for Link)
const menuItems = [
  {
    key: "dashboard",
    label: <Link to="/admin">Dashboard</Link>,
  },
  {
    key: "products",
    label: <Link to="/admin/products">Products</Link>,
  },
  {
    key: "dealers",
    label: <Link to="/admin/dealers">Dealers</Link>,
  },
  {
    key: "purchases",
    label: <Link to="/admin/purchases">Purchases</Link>,
  },
  {
    key: "offers",
    label: <Link to="/admin/offers">Offers</Link>,
  },
  {
    key: "customers",
    label: <Link to="/admin/customers">Customers</Link>,
  },
  {
    key: "orders",
    label: <Link to="/admin/orders">Orders</Link>,
  },
  // {
  //   key:"Logout",
  //   label:<Link to="/admin/orders">Logout</Link>,
  // }
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Sider width={200} style={{ background: "#eee", padding: "10px" }}>
    <div style={{background:"#fff", paddingBottom:"20px"}}>
     
      <div
        className="d-flex flex-column"
        style={{ minHeight: "90vh", display: "flex", flexDirection: "column" }}
      >
        <h3 style={{ color: "#6b4226", fontWeight: "bold" }}>Admin Menu</h3>
        <Menu
          mode="vertical"
          theme="light"
          style={{ flex: 1, border: "none", marginBottom: "20px" }}
          items={menuItems}
          // optional: set default selected key or selectedKeys based on route
          // defaultSelectedKeys={['dashboard']}
        />
        <Button
          onClick={handleLogout}
          type="primary"
          danger
          style={{ marginTop: "auto", width: "100%" }}
        >
          Logout
        </Button>
      </div>
    </div> 
    </Sider>
  );
};

export default Sidebar;
