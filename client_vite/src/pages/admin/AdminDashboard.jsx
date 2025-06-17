// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import { Outlet } from 'react-router-dom';
// import AdminCharts from '../components/AdminCharts'; // 👈 Add this

// const AdminDashboard = () => {
//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <div style={{ flex: 1 }}>
//         <div style={{ padding: '20px' }}>
//           <h1>Admin Dashboard</h1>
//           <AdminCharts /> {/* 👈 Add this line to render the chart */}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


















// import React from 'react';
// import { Layout, Row, Col } from 'antd';
// import Sidebar from '../components/Sidebar';
// import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AdminCharts from '../components/AdminCharts'; // Import AdminCharts component

// const { Content } = Layout;

// const AdminDashboard = () => {
//   const location = useLocation(); // Hook to get the current location

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sidebar /> {/* Sidebar stays the same */}
//       <Layout>
//         <Content style={{ padding: '20px', backgroundColor: '#f5f5f5', overflow: 'auto' }}>
//           <div className="container" style={{ maxWidth: '1200px'}}>
            // <Row>
            //   <Col span={24}>
            //     <h1 className="mb-4">Admin Dashboard</h1>
            //   </Col>
            // </Row>
//             {/* Render AdminCharts only when on the dashboard route */}
//             {location.pathname === '/admin' && (
//               <Row gutter={[16, 16]}>
//                 <Col span={24}>
//                   <div className="card shadow-sm">
//                     <div className="card-body">
//                       <AdminCharts />
//                     </div>
//                   </div>
//                 </Col>
//               </Row>
//             )}
//             <Row>
//               <Col span={24}>
//                 {/* Render outlet for other components */}
//                 <Outlet />
//               </Col>
//             </Row>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminDashboard;









import React from 'react';
import { Layout, Row, Col } from 'antd';
import Sidebar from '../../components/adminSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminCharts from '../../components/AdminCharts';

const { Content } = Layout;

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '20px', backgroundColor: '#f5f5f5', overflow: 'auto' }}>
          <div className="container" style={{ maxWidth: '1200px' }}>
          <Row>
              <Col span={24}>
              </Col>
            </Row>
            {/* Only show AdminCharts if route is exactly /admin */}
            {location.pathname === '/admin' ? (
              
              <Row gutter={[16, 16]}>
                <h1 className="mb-4">Admin Dashboard</h1>
                <Col span={24}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <AdminCharts />
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={24}>
                  <Outlet />
                </Col>
              </Row>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;








// import { Outlet } from 'react-router-dom';

// import React from 'react';
// import { Layout, Row, Col } from 'antd';
// import Sidebar from '../components/Sidebar';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const { Content } = Layout;

// const AdminDashboard = () => {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sidebar /> {/* Sidebar stays the same */}
//       <Layout>
//         <Content style={{ padding: '20px', backgroundColor: '#f5f5f5', overflow: 'auto' }}>
//           <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
//             <Row>
//               <Col span={24}>
//                 <h1 className="mb-4">Admin Dashboard</h1>
//               </Col>
//             </Row>
//             <Row gutter={[16, 16]}>
//               <Col span={24}>
//                 {/* Add this component to render the chart */}
//                 <div className="card shadow-sm">
//                   <div className="card-body">
//                     {/* <AdminCharts /> */}
//                   </div>
//                 </div>
//               </Col>
//             </Row>
//             <Row>
//               <Col span={24}>
//                 {/* Render outlet for other components */}
//                 <Outlet />
//               </Col>
//             </Row>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminDashboard;
