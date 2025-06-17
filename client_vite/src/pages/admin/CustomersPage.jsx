// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CustomersPage = () => {
//   const [customers, setCustomers] = useState([]);

//   useEffect(() => {
//     axios.get('/api/customers/all')
//       .then(res => setCustomers(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Customer Details</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr><th>Name</th><th>Email</th><th>Gender</th><th>Mobile</th></tr>
//         </thead>
//         <tbody>
//           {customers.map(c => (
//             <tr key={c.id}>
//               <td>{c.name}</td>
//               <td>{c.email}</td>
//               <td>{c.gender}</td>
//               <td>{c.mobile}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomersPage;




















import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customer/admin/customers", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCustomers(res.data);
          setError("");
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch customers:", err);
        setError("Failed to fetch customers");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Customers</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Full Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Gender</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{customer.full_name}</td>
                <td style={tdStyle}>{customer.email}</td>
                <td style={tdStyle}>{customer.phone || "N/A"}</td>
                <td style={tdStyle}>{customer.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default CustomersPage;
