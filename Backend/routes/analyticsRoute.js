// // analytics report.js --> backend route
// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// router.get('/dashboard-summary', async (req, res) => {
//   try {
//     // Fetching monthly purchase data
//     const [purchaseData] = await db.query(`
//       SELECT DATE_FORMAT(created_at, '%M') AS month, SUM(quantity * purchase_price) AS total
//       FROM purchases
//       GROUP BY month
//     `);

//     // Fetching monthly sales data
//     const [salesData] = await db.query(`
//       SELECT DATE_FORMAT(order_date, '%M') AS month, SUM(total_amount) AS total
//       FROM orders
//       GROUP BY month
//     `);

//     // Combine purchase and sales data
//     const dataMap = {};

//     // Adding purchase data to the map
//     purchaseData.forEach(p => {
//       dataMap[p.month] = { label: p.month, purchase: p.total, sales: 0, profit: 0 };
//     });

//     // Adding sales data to the map
//     salesData.forEach(s => {
//       if (!dataMap[s.month]) {
//         dataMap[s.month] = { label: s.month, purchase: 0, sales: s.total, profit: 0 };
//       } else {
//         dataMap[s.month].sales = s.total;
//       }
//     });

//     // Calculating profit (sales - purchase)
//     Object.values(dataMap).forEach(entry => {
//       entry.profit = entry.sales - entry.purchase;
//     });

//     res.json(Object.values(dataMap));
    
//   } catch (error) {
//     console.error('Dashboard summary error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;





// // analytics report.js --> backend route
// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// router.get('/dashboard-summary', async (req, res) => {
//   try {
//     // Fetching monthly purchase data
//     const [purchaseData] = await db.query(`
//       SELECT DATE_FORMAT(created_at, '%M') AS month, SUM(quantity * purchase_price) AS total
//       FROM purchases
//       GROUP BY month
//     `);

//     // Fetching monthly sales data
//     const [salesData] = await db.query(`
//       SELECT DATE_FORMAT(order_date, '%M') AS month, SUM(total_amount) AS total
//       FROM orders
//       GROUP BY month
//     `);

//     // Combine purchase and sales data
//     const dataMap = {};

//     // Adding purchase data to the map
//     purchaseData.forEach(p => {
//       dataMap[p.month] = { label: p.month, purchase: p.total, sales: 0, profit: 0, purchasePercentage: 0, salesPercentage: 0, profitPercentage: 0 };
//     });

//     // Adding sales data to the map
//     salesData.forEach(s => {
//       if (!dataMap[s.month]) {
//         dataMap[s.month] = { label: s.month, purchase: 0, sales: s.total, profit: 0, purchasePercentage: 0, salesPercentage: 0, profitPercentage: 0 };
//       } else {
//         dataMap[s.month].sales = s.total;
//       }
//     });

//     // Calculating profit (sales - purchase)
//     Object.values(dataMap).forEach(entry => {
//       entry.profit = entry.sales - entry.purchase;

//       // Calculate percentage
//       const total = entry.purchase + entry.sales + entry.profit;
//       entry.purchasePercentage = total ? ((entry.purchase / total) * 100).toFixed(2) : 0;
//       entry.salesPercentage = total ? ((entry.sales / total) * 100).toFixed(2) : 0;
//       entry.profitPercentage = total ? ((entry.profit / total) * 100).toFixed(2) : 0;
//     });

//     res.json(Object.values(dataMap));
    
//   } catch (error) {
//     console.error('Dashboard summary error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// router.get('/dashboard-summary', async (req, res) => {
//     try {
//       const [purchaseData] = await db.query(`
//         SELECT DATE_FORMAT(date_time, '%M') as month, SUM(quantity * price) as total
//         FROM purchases
//         GROUP BY month
//       `);
  
//       const [salesData] = await db.query(`
//         SELECT DATE_FORMAT(created_at, '%M') as month, SUM(total_amount) as total
//         FROM orders
//         GROUP BY month
//       `);
  
//       // Combine purchase and sales data
//       const dataMap = {};
  
//       purchaseData.forEach(p => {
//         dataMap[p.month] = { label: p.month, purchase: parseFloat(p.total), sales: 0, profit: 0, purchasePercentage: 0, salesPercentage: 0, profitPercentage: 0 };
//       });
  
//       salesData.forEach(s => {
//         if (!dataMap[s.month]) {
//           dataMap[s.month] = { label: s.month, purchase: 0, sales: parseFloat(s.total), profit: 0, purchasePercentage: 0, salesPercentage: 0, profitPercentage: 0 };
//         } else {
//           dataMap[s.month].sales = parseFloat(s.total);
//         }
//       });
  
//       // Calculate profit and percentages (ensure no division by zero)
//       Object.values(dataMap).forEach(entry => {
//         entry.profit = entry.sales - entry.purchase;
  
//         // Calculate Purchase Percentage
//         if (entry.purchase !== 0 && !isNaN(entry.purchase)) {
//           entry.purchasePercentage = ((entry.purchase / (entry.sales || 1)) * 100).toFixed(2); // Avoid divide by zero
//         } else {
//           entry.purchasePercentage = "0.00"; // Default to zero if purchase is zero or invalid
//         }
  
//         // Calculate Sales Percentage
//         if (entry.sales !== 0 && !isNaN(entry.sales)) {
//           entry.salesPercentage = ((entry.sales / (entry.purchase || 1)) * 100).toFixed(2); // Avoid divide by zero
//         } else {
//           entry.salesPercentage = "0.00"; // Default to zero if sales is zero or invalid
//         }
  
//         // Calculate Profit Percentage
//         if (entry.profit !== 0 && !isNaN(entry.profit)) {
//           entry.profitPercentage = ((entry.profit / (entry.purchase || 1)) * 100).toFixed(2); // Avoid divide by zero
//         } else {
//           entry.profitPercentage = "0.00"; // Default to zero if profit is zero or invalid
//         }
//       });
  
//       res.json(Object.values(dataMap));
  
//     } catch (error) {
//       console.error('Dashboard summary error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
// module.exports = router;












// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// router.get('/dashboard-summary', async (req, res) => {
//   try {
//     // Get total monthly purchase data
//     const [purchaseData] = await db.query(`
//       SELECT DATE_FORMAT(date_time, '%M') as month, SUM(quantity * price) as total
//       FROM purchases
//       GROUP BY month
//     `);

//     // Get total monthly sales data
//     const [salesData] = await db.query(`
//       SELECT DATE_FORMAT(created_at, '%M') as month, SUM(total_amount) as total
//       FROM orders
//       GROUP BY month
//     `);


//     const dataMap = {};

//     // Add purchase data
//     purchaseData.forEach(p => {
//       dataMap[p.month] = {
//         label: p.month,
//         purchase: parseFloat(p.total),
//         sales: 0,
//         profit: 0,
//         purchasePercentage: "0.00",
//         salesPercentage: "0.00",
//         profitPercentage: "0.00"
//       };
//     });

//     // Add sales data
//     salesData.forEach(s => {
//       if (!dataMap[s.month]) {
//         dataMap[s.month] = {
//           label: s.month,
//           purchase: 0,
//           sales: parseFloat(s.total),
//           profit: 0,
//           purchasePercentage: "0.00",
//           salesPercentage: "0.00",
//           profitPercentage: "0.00"
//         };
//       } else {
//         dataMap[s.month].sales = parseFloat(s.total);
//       }
//     });

//     // Calculate profit and percentage values
//     Object.values(dataMap).forEach(entry => {
//       entry.profit = entry.sales - entry.purchase;

//       entry.purchasePercentage = entry.purchase ? ((entry.purchase / (entry.sales || 1)) * 100).toFixed(2) : "0.00";
//       entry.salesPercentage = entry.sales ? ((entry.sales / (entry.purchase || 1)) * 100).toFixed(2) : "0.00";
//       entry.profitPercentage = entry.profit ? ((entry.profit / (entry.purchase || 1)) * 100).toFixed(2) : "0.00";
//     });

//     res.json(Object.values(dataMap));
//   } catch (error) {
//     console.error('Dashboard summary error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;























const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/analytics/dashboard-summary
router.get('/dashboard-summary', async (req, res) => {
  try {
    // Aggregate monthly purchase data by summing purchase_price
    const [purchaseRows] = await pool.query(`
      SELECT DATE_FORMAT(created_at, '%M') AS month, SUM(purchase_price) AS total
      FROM purchases
      GROUP BY month
    `);

    // Aggregate monthly sales data by summing total_amount
    const [salesRows] = await pool.query(`
      SELECT DATE_FORMAT(order_date, '%M') AS month, SUM(total_amount) AS total
      FROM orders
      GROUP BY month
    `);

    // Combine months from both datasets
    const months = [...new Set([...purchaseRows.map(r => r.month), ...salesRows.map(r => r.month)])];

    // Merge into final chart data
    const summary = months.map(month => {
      const purchase = purchaseRows.find(r => r.month === month)?.total || 0;
      const sales = salesRows.find(r => r.month === month)?.total || 0;
      const profit = sales - purchase;

      return {
        label: month,
        purchase,
        sales,
        profit
      };
    });

    res.json(summary);
  } catch (error) {
    console.error('Dashboard summary error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

