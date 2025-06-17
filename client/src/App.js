// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CustomerShop from './pages/CustomerShop';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import AdminDashboard from './pages/AdminDashboard';
// import ProductPage from './pages/ProductPage';
// import DealerPage from './pages/DealerPage';
// import PurchasePage from './pages/PurchasePage';
// import AddProductPage from './pages/AddProductPage';
// import AddDealerPage from './pages/AddDealerPage';
// import AddPurchasePage from './pages/AddPurchasePage';
// import ProductDetailsPage from './pages/ProductDetailsPage';
// import BuyNowPage from './pages/BuyNowPage';  // Add BuyNowPage import
// import CartPage from './pages/CartPage';  // Add CartPage import
// import { getUserRole } from './utils/auth';
// import CheckoutPage from './pages/CheckoutPage';
// import ProfilePage from './pages/ProfilePage';
// import OrderDetailsPage from './pages/OrderDetailsPage';
// import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap styles
// import 'antd/dist/reset.css';  // Ant Design styles


// function App() {
//   const role = getUserRole();

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<CustomerShop />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/product/:id" element={<ProductDetailsPage />} />
//         <Route path="/buy-now" element={<BuyNowPage />} />  {/* Buy Now Page */}
//         <Route path="/cart" element={<CartPage />} />  {/* Cart Page */}
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/order/:orderId" element={<OrderDetailsPage />} />

        
//         {/* Admin Protected Routes */}
//         {role === 'admin' && (
//             <Route path="/admin" element={<AdminDashboard />}>
//             <Route path="products" element={<ProductPage />} />
//             <Route path="dealers" element={<DealerPage />} />
//             <Route path="purchases" element={<PurchasePage />} />
//             <Route path="products/add" element={<AddProductPage />} />
//             <Route path="dealers/add" element={<AddDealerPage />} />
//             <Route path="purchase/add" element={<AddPurchasePage />} />
//           </Route>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;






// App.js
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getUserRole } from './utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';

// Lazy-loaded components
const CustomerShop = lazy(() => import('./pages/CustomerShop'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const DealerPage = lazy(() => import('./pages/DealerPage'));
const PurchasePage = lazy(() => import('./pages/PurchasePage'));
const AddProductPage = lazy(() => import('./pages/AddProductPage'));
const AddDealerPage = lazy(() => import('./pages/AddDealerPage'));
const AddPurchasePage = lazy(() => import('./pages/AddPurchasePage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const BuyNowPage = lazy(() => import('./pages/BuyNowPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.js'));

// Auth wrapper
const RequireAuth = ({ children, role }) => {
  const userRole = getUserRole();
  return userRole === role ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<CustomerShop />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/buy-now" element={<BuyNowPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order/:orderId" element={<OrderDetailsPage />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <RequireAuth role="admin">
                <AdminDashboard />
              </RequireAuth>
            }
          >
            <Route path="products" element={<ProductPage />} />
            <Route path="dealers" element={<DealerPage />} />
            <Route path="purchases" element={<PurchasePage />} />
            <Route path="products/add" element={<AddProductPage />} />
            <Route path="dealers/add" element={<AddDealerPage />} />
            <Route path="purchase/add" element={<AddPurchasePage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
