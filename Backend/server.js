// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const fs = require('fs');

// // Load environment variables
// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3001', // Replace with your frontend's URL in production
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve image files from uploads folder
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir); // Ensure uploads directory exists
// }
// app.use('/uploads', express.static(uploadsDir));

// // Routes
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const dealerRoutes = require('./routes/dealerRoutes');
// const purchaseRoutes = require('./routes/purchaseRoutes');
// const orderRoute = require('./routes/orderRoutes');
// const analyticsRoute = require('./routes/analyticsRoute');
// const userRoutes = require('./routes/userRoutes');


// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/dealers', dealerRoutes);
// app.use('/api/purchases', purchaseRoutes);
// app.use('/api/order', orderRoute);
// app.use('/api/analytics', analyticsRoute);
// app.use('/api', userRoutes);


// // Test route
// app.get('/', (req, res) => {
//   res.send('Backend is working 🚀');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

















// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const fs = require('fs');
// const helmet = require('helmet');

// // Load environment variables from .env file
// dotenv.config();

// const app = express();

// // Middleware: Security headers
// app.use(helmet());

// // Middleware: CORS (configurable origin)
// const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3001';
// app.use(cors({
//   origin: allowedOrigin,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// // Middleware: JSON and URL-encoded body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Ensure uploads directory exists and serve static files
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }
// app.use('/uploads', express.static(uploadsDir));

// // Import routes
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const dealerRoutes = require('./routes/dealerRoutes');
// const purchaseRoutes = require('./routes/purchaseRoutes');
// const orderRoute = require('./routes/orderRoutes');
// const analyticsRoute = require('./routes/analyticsRoute');
// const userRoutes = require('./routes/userRoutes');
// const offersRoutes = require('./routes/offerRoutes');

// // Mount routes with base paths
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/dealers', dealerRoutes);
// app.use('/api/purchases', purchaseRoutes);
// app.use('/api/order', orderRoute);
// app.use('/api/analytics', analyticsRoute);
// app.use('/api', userRoutes);
// app.use('/api/offers', offersRoutes);

// // Basic test route
// app.get('/', (req, res) => {
//   res.send('Backend is working 🚀');
// });

// // Global error handler middleware
// app.use((err, req, res, next) => {
//   console.error('Global error handler:', err.stack);
//   res.status(500).json({ error: 'Internal server error' });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
















//30-05-25

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const fs = require('fs');
// const helmet = require('helmet');

// // Load environment variables from .env file
// dotenv.config();

// const app = express();

// // Middleware: Security headers
// app.use(helmet());

// const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3001';

// // Middleware: CORS for all API routes
// app.use(cors({
//   origin: allowedOrigin,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// // Middleware: JSON and URL-encoded body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Serve static files under /uploads with CORS enabled
// app.use(
//   '/uploads',
//   cors({
//     origin: allowedOrigin,
//     methods: ['GET'],
//     allowedHeaders: ['Content-Type'],
//   }),
//   express.static(uploadsDir)
// );

// // Import routes (adjust paths as per your project structure)
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const dealerRoutes = require('./routes/dealerRoutes');
// const purchaseRoutes = require('./routes/purchaseRoutes');
// const orderRoute = require('./routes/orderRoutes');
// const analyticsRoute = require('./routes/analyticsRoute');
// const userRoutes = require('./routes/userRoutes');
// const offersRoutes = require('./routes/offerRoutes');

// // Mount routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/dealers', dealerRoutes);
// app.use('/api/purchases', purchaseRoutes);
// app.use('/api/orders', orderRoute);
// app.use('/api/analytics', analyticsRoute);
// app.use('/api', userRoutes);
// app.use('/api/offers', offersRoutes);

// // Basic test route
// app.get('/', (req, res) => {
//   res.send('Backend is working 🚀');
// });

// // Global error handler middleware
// app.use((err, req, res, next) => {
//   console.error('Global error handler:', err.stack);
//   res.status(500).json({ error: 'Internal server error' });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

























const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware: Security headers
app.use(helmet());

// Allowed origin for CORS (client URL)
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3001';

// Middleware: CORS for all API routes with extended methods
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware: JSON and URL-encoded body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files under /uploads with CORS enabled
app.use(
  '/uploads',
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
  express.static(uploadsDir)
);

// Import routes (adjust paths if needed)
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const dealerRoutes = require('./routes/dealerRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const orderRoutes = require('./routes/orderRoutes');
const analyticsRoutes = require('./routes/analyticsRoute');
const userRoutes = require('./routes/userRoutes');
const offersRoutes = require('./routes/offerRoutes');
// const customerAdminRoutes = require('./routes/customerRoutes');

// Mount routes under consistent plural paths
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/offers', offersRoutes);
// app.use('/api/customer/admin', customerAdminRoutes);


// Basic test route
app.get('/', (req, res) => {
  res.send('Backend is working 🚀');
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
