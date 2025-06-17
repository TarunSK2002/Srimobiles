// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button, Layout, Menu } from 'antd';
// import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// const { Header } = Layout;

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <Header style={{ backgroundColor: '#f5deb3', padding: '0 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//       <div className="d-flex justify-content-between align-items-center">
//         <div className="d-flex align-items-center">
//           <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#6b4226', marginRight: '30px' }}>
//             NutriCart
//           </span>
//           <Menu mode="horizontal" theme="light" style={{ border: 'none' }}>
//             <Menu.Item key="home">
//               <Link to="/" className="text-dark">Home</Link>
//             </Menu.Item>
//             <Menu.Item key="shop">
//               <Link to="/shop" className="text-dark">Shop</Link>
//             </Menu.Item>
//             {user?.role === 'customer' && (
//               <>
//                 <Menu.Item key="cart">
//                   <Link to="/cart" className="text-dark">
//                     <ShoppingCartOutlined /> Cart
//                   </Link>
//                 </Menu.Item>
//                 <Menu.Item key="profile">
//                   <Link to="/profile" className="text-dark">
//                     <UserOutlined /> Profile
//                   </Link>
//                 </Menu.Item>
//               </>
//             )}
//           </Menu>
//         </div>

//         <div>
//           {user ? (
//             <Button onClick={handleLogout} style={buttonStyle}>Logout</Button>
//           ) : (
//             <Button onClick={() => navigate('/login')} style={buttonStyle}>Login</Button>
//           )}
//         </div>
//       </div>
//     </Header>
//   );
// };

// const buttonStyle = {
//   backgroundColor: '#8b5e3c',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer'
// };

// export default Navbar;

















// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Dropdown, Menu, Avatar, Badge } from "antd";
// import {
//   UserOutlined,
//   ShoppingCartOutlined,
//   PhoneOutlined,
//   MailOutlined,
//   LogoutOutlined,
//   HeartOutlined,
//   ProfileOutlined,
//   UnorderedListOutlined,
// } from "@ant-design/icons";
// import "./NavbarCustomer.css"; // Optional for custom styling

// const NavbarCustomer = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const profileMenu = (
//     <Menu>
//       <Menu.Item icon={<ProfileOutlined />} key="profile">
//         <Link to="/profile">My Profile</Link>
//       </Menu.Item>
//       <Menu.Item icon={<UnorderedListOutlined />} key="orders">
//         <Link to="/orders">My Orders</Link>
//       </Menu.Item>
//       <Menu.Item icon={<HeartOutlined />} key="wishlist">
//         <Link to="/wishlist">Wishlist</Link>
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item icon={<LogoutOutlined />} key="logout" onClick={handleLogout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
//       <Link className="navbar-brand fw-bold text-primary" to="/">
//         SRI MOBILES
//       </Link>

//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarCustomer"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarCustomer">
//         <form className="d-flex mx-auto" style={{ maxWidth: "500px", flex: 1 }}>
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Search mobiles, gadgets..."
//             aria-label="Search"
//           />
//           <button className="btn btn-outline-primary" type="submit">
//             Search
//           </button>
//         </form>

//         <ul className="navbar-nav ms-auto align-items-center">
//           <li className="nav-item mx-2">
//             <Dropdown overlay={profileMenu} placement="bottomRight" trigger={['click']}>
//               <Avatar size="large" icon={<UserOutlined />} style={{ cursor: "pointer" }} />
//             </Dropdown>
//           </li>

//           <li className="nav-item mx-2">
//             <Link to="/cart" className="nav-link position-relative">
//               <Badge count={2} offset={[0, 0]}>
//                 <ShoppingCartOutlined style={{ fontSize: "24px" }} />
//               </Badge>
//             </Link>
//           </li>

//           <li className="nav-item mx-2">
//             <Link to="/customer-support" className="nav-link">
//               <PhoneOutlined /> Support
//             </Link>
//           </li>

//           <li className="nav-item mx-2">
//             <Link to="/contact" className="nav-link">
//               <MailOutlined /> Contact
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavbarCustomer;































import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu, Avatar, Badge, Button } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  MailOutlined,
  LogoutOutlined,
  HeartOutlined,
  ProfileOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./NavbarCustomer.css";

const NavbarCustomer = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const profileMenu = (
    <Menu>
      <Menu.Item icon={<ProfileOutlined />} key="profile">
        <Link to="/profile">My Profile</Link>
      </Menu.Item>
      <Menu.Item icon={<UnorderedListOutlined />} key="orders">
        <Link to="/orders">My Orders</Link>
      </Menu.Item>
      <Menu.Item icon={<HeartOutlined />} key="wishlist">
        <Link to="/wishlist">Wishlist</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />} key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand fw-bold text-primary" to="/">
        SRI MOBILES
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCustomer"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCustomer">
        <form className="d-flex mx-auto" style={{ maxWidth: "500px", flex: 1 }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search mobiles, gadgets..."
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>

        <ul className="navbar-nav ms-auto align-items-center">
          {user ? (
            <>
              <li className="nav-item mx-2">
                <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]}>
                  <Avatar size="large" icon={<UserOutlined />} style={{ cursor: "pointer" }} />
                </Dropdown>
              </li>

              <li className="nav-item mx-2">
                <Link to="/cart" className="nav-link position-relative">
                  <Badge count={2} offset={[0, 0]}>
                    <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                  </Badge>
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item mx-2">
              <Button
                type="primary"
                onClick={() => navigate("/login")}
                style={{
                  backgroundColor: "#0d6efd",
                  borderColor: "#0d6efd",
                }}
              >
                Login
              </Button>
            </li>
          )}

          <li className="nav-item mx-2">
            <Link to="/customer-support" className="nav-link">
              <PhoneOutlined /> Support
            </Link>
          </li>

          <li className="nav-item mx-2">
            <Link to="/contact" className="nav-link">
              <MailOutlined /> Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarCustomer;
