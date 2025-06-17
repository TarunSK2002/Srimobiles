// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// App.js
// import React, { lazy, Suspense } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { getUserRole } from "./utils/auth";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "antd/dist/reset.css";

// // Lazy-loaded components
// const CustomerShop = lazy(() => import("./pages/home/CustomerShop"));
// const LoginPage = lazy(() => import("./pages/authentication/LoginPage"));
// const RegisterPage = lazy(() => import("./pages/authentication/RegisterPage"));
// const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
// const ProductPage = lazy(() => import("./pages/admin/ProductPage"));
// const DealerPage = lazy(() => import("./pages/admin/DealerPage"));
// const PurchasePage = lazy(() => import("./pages/admin/PurchasePage"));
// const AddProductPage = lazy(() => import("./pages/admin/AddProductPage"));
// const AddDealerPage = lazy(() => import("./pages/admin/AddDealerPage"));
// const AddPurchasePage = lazy(() => import("./pages/admin/AddPurchasePage"));
// const ProductDetailsPage = lazy(() => import("./pages/home/ProductDetailsPage"));
// const BuyNowPage = lazy(() => import("./pages/home/BuyNowPage"));
// const CartPage = lazy(() => import("./pages/home/CartPage"));
// const CheckoutPage = lazy(() => import("./pages/home/CheckoutPage"));
// const ProfilePage = lazy(() => import("./pages/home/ProfilePage"));
// const OrderDetailsPage = lazy(() => import("./pages/home/OrderDetailsPage"));
// const NotFoundPage = lazy(() => import("./pages/home/NotFoundPage"));
// const OffersPage = lazy(() => import('./pages/admin/OffersPage'));
// const CustomersPage = lazy(() => import('./pages/admin/CustomersPage'));
// const OrdersPage = lazy(() => import('./pages/admin/OrdersPage'));

// // Auth wrapper
// const RequireAuth = ({ children, role }) => {
//   const userRole = getUserRole();
//   return userRole === role ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<CustomerShop />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/product/:id" element={<ProductDetailsPage />} />
//           <Route path="/buy-now" element={<BuyNowPage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/order/:orderId" element={<OrderDetailsPage />} />

//           {/* Admin Protected Routes */}
//           <Route
//             path="/admin"
//             element={
//               <RequireAuth role="admin">
//                 <AdminDashboard />
//               </RequireAuth>
//             }
//           >
//             <Route path="products" element={<ProductPage />} />
//             <Route path="dealers" element={<DealerPage />} />
//             <Route path="purchases" element={<PurchasePage />} />
//             <Route path="products/add" element={<AddProductPage />} />
//             <Route path="dealers/add" element={<AddDealerPage />} />
//             <Route path="purchase/add" element={<AddPurchasePage />} />
//             <Route path="/admin/offers" element={<OffersPage />} />
//             <Route path="/admin/customers" element={<CustomersPage />} />
//             {/* <Route path="/admin/orders" element={<OrdersPage />} /> */}
//             <Route path="/admin/orders" element={<OrdersPage />} />
//           </Route>

//           {/* Fallback route */}
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;
































import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getUserRole } from "./utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";

// Lazy-loaded components (Customer Pages)
const CustomerShop = lazy(() => import("./pages/home/CustomerShop"));
const ProductDetailsPage = lazy(() => import("./pages/home/ProductDetailsPage"));
const BuyNowPage = lazy(() => import("./pages/home/BuyNowPage"));
const CartPage = lazy(() => import("./pages/home/CartPage"));
const CheckoutPage = lazy(() => import("./pages/home/CheckoutPage"));
const ProfilePage = lazy(() => import("./pages/home/ProfilePage"));
const OrderDetailsPage = lazy(() => import("./pages/home/OrderDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/home/NotFoundPage"));
const CustomerSupportPage = lazy(() => import("./pages/home/CustomerSupportPage"));
const ContactPage = lazy(() => import("./pages/home/ContactPage"));
const WishlistPage = lazy(() => import("./pages/home/WishlistPage"));
const MyOrdersPage = lazy(() => import("./pages/home/MyOrdersPage"));
const MyProfilePage = lazy(() => import("./pages/home/ProfilePage"));
import Header from "../src/components/Header";

// Lazy-loaded components (Auth)
const LoginPage = lazy(() => import("./pages/authentication/LoginPage"));
const RegisterPage = lazy(() => import("./pages/authentication/RegisterPage"));

// Lazy-loaded components (Admin)
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ProductPage = lazy(() => import("./pages/admin/ProductPage"));
const DealerPage = lazy(() => import("./pages/admin/DealerPage"));
const PurchasePage = lazy(() => import("./pages/admin/PurchasePage"));
const AddProductPage = lazy(() => import("./pages/admin/AddProductPage"));
const AddDealerPage = lazy(() => import("./pages/admin/AddDealerPage"));
const AddPurchasePage = lazy(() => import("./pages/admin/AddPurchasePage"));
const OffersPage = lazy(() => import('./pages/admin/OffersPage'));
const CustomersPage = lazy(() => import('./pages/admin/CustomersPage'));
const OrdersPage = lazy(() => import('./pages/admin/OrdersPage'));

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
          {/* Public + Customer Routes */}
          <Route path="/" element={<CustomerShop />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/buy-now" element={<BuyNowPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order/:orderId" element={<OrderDetailsPage />} />
          <Route path="/support" element={<CustomerSupportPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />

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
            <Route path="offers" element={<OffersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
