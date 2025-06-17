// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear(); // or remove specific auth token
//     navigate('/');
//   };

//   return (
//     <div style={{ width: '200px', background: '#eee', padding: '10px', minHeight: '95vh', flexDirection: 'column', justifyContent: 'space-around' }}>
//       <div>
//         <h3>Admin Menu</h3>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           <li><Link to="/admin">Dashboard</Link></li>
//           <li><Link to="/admin/products">Products</Link></li>
//           <li><Link to="/admin/dealers">Dealers</Link></li>
//           <li><Link to="/admin/purchases">Purchases</Link></li>
//         </ul>
//       </div>
      
//       <button
//         onClick={handleLogout}
//         style={{
//           marginTop: '60vh',
//           padding: '10px',
//           backgroundColor: '#d9534f',
//           color: '#fff',
//           border: 'none',
//           cursor: 'pointer',
//           width: '100%',
//           fontWeight: 'bold'
//         }}  
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;






import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // or remove specific auth token
    navigate('/');
  };

  return (
    <Sider width={200} style={{ background: '#eee', padding: '10px' }}>
      <div className="d-flex flex-column" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#6b4226', fontWeight: 'bold' }}>Admin Menu</h3>
        <Menu
          mode="vertical"
          theme="light"
          style={{ flex: 1, border: 'none', marginBottom: '20px' }}
        >
          <Menu.Item key="dashboard">
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="products">
            <Link to="/admin/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="dealers">
            <Link to="/admin/dealers">Dealers</Link>
          </Menu.Item>
          <Menu.Item key="purchases">
            <Link to="/admin/purchases">Purchases</Link>
          </Menu.Item>
        </Menu>

        <Button
          onClick={handleLogout}
          type="primary"
          danger
          style={{ marginTop: 'auto', width: '100%' }}
        >
          Logout
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;

