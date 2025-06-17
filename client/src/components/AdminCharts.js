/// Bar chart 
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import axios from 'axios';

const AdminCharts = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/analytics/dashboard-summary')
      .then((res) => setChartData(res.data))
      .catch((err) => console.error('Chart data fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  // Function to ensure valid numbers for calculation
  const getTotal = (key) => {
    return chartData
      .map((item) => parseFloat(item[key]) || 0)  // Safely convert to number, defaulting to 0 if NaN
      .reduce((sum, value) => sum + value, 0)
      .toFixed(2);
  };

  const totalPurchase = getTotal('purchase');
  const totalSales = getTotal('sales');
  const totalProfit = getTotal('profit');

  if (loading) return <p>Loading chart data...</p>;

  return (
    <div >
      <h2 className="mb-4">Purchase, Sales & Profit Overview</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3 text-center shadow-sm">
            <h5 className="text-muted">Total Purchase</h5>
            <h3 className="text-primary">₹{totalPurchase}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center shadow-sm">
            <h5 className="text-muted">Total Sales</h5>
            <h3 className="text-success">₹{totalSales}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 text-center shadow-sm">
            <h5 className="text-muted">Total Profit</h5>
            <h3 className="text-warning">₹{totalProfit}</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="purchase" fill="#8884d8" name="Purchase" />
          <Bar dataKey="sales" fill="#82ca9d" name="Sales" />
          <Bar dataKey="profit" fill="#ffc658" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminCharts;





















// //Line Chart
// import React, { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';
// import axios from 'axios';

// const AdminCharts = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/analytics/dashboard-summary?range=3months')
//       .then((res) => setChartData(res.data))
//       .catch((err) => console.error('Chart data fetch error:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   // Function to ensure valid numbers for calculation
//   const getTotal = (key) => {
//     return chartData
//       .map((item) => parseFloat(item[key]) || 0)  // Safely convert to number, defaulting to 0 if NaN
//       .reduce((sum, value) => sum + value, 0)
//       .toFixed(2);
//   };

//   const totalPurchase = getTotal('purchase');
//   const totalSales = getTotal('sales');
//   const totalProfit = getTotal('profit');

//   if (loading) return <p>Loading chart data...</p>;

//   return (
//     <div>
//       <h2 className="mb-4">Purchase, Sales & Profit Overview</h2>

//       {/* Summary Cards */}
//       <div className="row mb-4">
//         <div className="col-md-4">
//           <div className="card p-3 text-center shadow-sm">
//             <h5 className="text-muted">Total Purchase</h5>
//             <h3 className="text-primary">₹{totalPurchase}</h3>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="card p-3 text-center shadow-sm">
//             <h5 className="text-muted">Total Sales</h5>
//             <h3 className="text-success">₹{totalSales}</h3>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="card p-3 text-center shadow-sm">
//             <h5 className="text-muted">Total Profit</h5>
//             <h3 className="text-warning">₹{totalProfit}</h3>
//           </div>
//         </div>
//       </div>

//       {/* Line Chart */}
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="label" />
//           <YAxis
//             tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
//           />
//           <Tooltip
//             formatter={(value) => {
//               const numericValue = Number(value);
//               return isNaN(numericValue) ? value : `₹${numericValue.toFixed(2)}`;
//             }}
//           />
//           <Legend verticalAlign="top" height={36} />
//           <Line type="monotone" dataKey="purchase" stroke="#8884d8" name="Purchase" />
//           <Line type="monotone" dataKey="sales" stroke="#82ca9d" name="Sales" />
//           <Line type="monotone" dataKey="profit" stroke="#ffc658" name="Profit" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default AdminCharts;





























