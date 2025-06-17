// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav style={{
//       padding: '12px 20px',
//       background: '#f5deb3',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//     }}>
//       <div>
//         <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '30px', color: '#6b4226' }}>
//           NutriCart
//         </span>
//         <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#6b4226' }}>Home</Link>
//         <Link to="/shop" style={{ marginRight: '20px', textDecoration: 'none', color: '#6b4226' }}>Shop</Link>
//         {user?.role === 'customer' && (
//           <>
//             <Link to="/cart" style={{ marginRight: '20px', textDecoration: 'none', color: '#6b4226' }}>Cart</Link>
//             <Link to="/profile" style={{ textDecoration: 'none', color: '#6b4226' }}>Profile</Link>
//           </>
//         )}
//       </div>

//       <div>
//         {user ? (
//           <button onClick={handleLogout} style={buttonStyle}>Logout</button>
//         ) : (
//           <button onClick={() => navigate('/login')} style={buttonStyle}>Login</button>
//         )}
//       </div>
//     </nav>
//   );
// };

// const buttonStyle = {
//   padding: '6px 16px',
//   backgroundColor: '#8b5e3c',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer'
// };

// export default Navbar;





import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Header style={{ backgroundColor: '#f5deb3', padding: '0 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#6b4226', marginRight: '30px' }}>
            NutriCart
          </span>
          <Menu mode="horizontal" theme="light" style={{ border: 'none' }}>
            <Menu.Item key="home">
              <Link to="/" className="text-dark">Home</Link>
            </Menu.Item>
            <Menu.Item key="shop">
              <Link to="/shop" className="text-dark">Shop</Link>
            </Menu.Item>
            {user?.role === 'customer' && (
              <>
                <Menu.Item key="cart">
                  <Link to="/cart" className="text-dark">
                    <ShoppingCartOutlined /> Cart
                  </Link>
                </Menu.Item>
                <Menu.Item key="profile">
                  <Link to="/profile" className="text-dark">
                    <UserOutlined /> Profile
                  </Link>
                </Menu.Item>
              </>
            )}
          </Menu>
        </div>

        <div>
          {user ? (
            <Button onClick={handleLogout} style={buttonStyle}>Logout</Button>
          ) : (
            <Button onClick={() => navigate('/login')} style={buttonStyle}>Login</Button>
          )}
        </div>
      </div>
    </Header>
  );
};

const buttonStyle = {
  backgroundColor: '#8b5e3c',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Navbar;

















// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button, Layout, Menu } from 'antd';
// import {
//   UserOutlined,
//   ShoppingCartOutlined,
//   AppstoreOutlined,
//   PlusOutlined,
//   ShopOutlined,
//   SolutionOutlined,
// } from '@ant-design/icons';
// import 'bootstrap/dist/css/bootstrap.min.css';

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

//             {user?.role === 'admin' && (
//               <>
//                 <Menu.Item key="products">
//                   <Link to="/admin/products" className="text-dark">
//                     <AppstoreOutlined /> Products
//                   </Link>
//                 </Menu.Item>
//                 <Menu.Item key="addProduct">
//                   <Link to="/admin/products/add" className="text-dark">
//                     <PlusOutlined /> Add Product
//                   </Link>
//                 </Menu.Item>
//                 <Menu.Item key="dealers">
//                   <Link to="/admin/dealers" className="text-dark">
//                     <SolutionOutlined /> Dealers
//                   </Link>
//                 </Menu.Item>
//                 <Menu.Item key="addDealer">
//                   <Link to="/admin/dealers/add" className="text-dark">
//                     <PlusOutlined /> Add Dealer
//                   </Link>
//                 </Menu.Item>
//                 <Menu.Item key="purchases">
//                   <Link to="/admin/purchases" className="text-dark">
//                     <ShopOutlined /> Purchases
//                   </Link>
//                 </Menu.Item>
//                 <Menu.Item key="addPurchase">
//                   <Link to="/admin/purchase/add" className="text-dark">
//                     <PlusOutlined /> Add Purchase
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
