import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [error, setError] = useState('');

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch details for one order
  const fetchOrderDetails = async (orderId) => {
    setError('');
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setSelectedOrder(res.data);
    } catch (err) {
      setError('Failed to fetch order details');
      console.error(err);
    }
  };

  // Handle order status change
  const handleStatusChange = async (orderId, newStatus) => {
    setStatusUpdating(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/orders/update-status', {
        order_id: orderId,
        status: newStatus,
      });

      // Update status locally for UI refresh
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );

      // Also update selectedOrder status if currently selected
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      setError('Failed to update status');
      console.error(err);
    } finally {
      setStatusUpdating(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Orders</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginBottom: 20 }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th>ID</th>
                <th>User ID</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No orders found.
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user_id}</td>
                  <td>{order.total_amount}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={statusUpdating}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>
                    <button onClick={() => fetchOrderDetails(order.id)}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedOrder && (
            <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 4 }}>
              <h3>Order Details (ID: {selectedOrder.id})</h3>
              <p>
                <b>User ID:</b> {selectedOrder.user_id}
              </p>
              <p>
                <b>Status:</b> {selectedOrder.status}
              </p>
              <p>
                <b>Total Amount:</b> {selectedOrder.total_amount}
              </p>
              <p>
                <b>Created At:</b> {new Date(selectedOrder.created_at).toLocaleString()}
              </p>

              <h4>Items</h4>
              {selectedOrder.items.length === 0 ? (
                <p>No items in this order.</p>
              ) : (
                <table border="1" cellPadding="6" cellSpacing="0" style={{ width: '100%' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#eee' }}>
                      <th>Product ID</th>
                      <th>Name</th>
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Total Grams</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.product_id}</td>
                        <td>{item.product_name}</td>
                        <td>{item.unit}</td>
                        <td>{item.quantity}</td>
                        <td>{item.total_grams}</td>
                        <td>{item.total_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button onClick={() => setSelectedOrder(null)} style={{ marginTop: 10 }}>
                Close Details
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPage;

