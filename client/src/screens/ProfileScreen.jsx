import React from 'react';
import { useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../slices/apiSlice';

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px' }}>
        <h2>User Profile</h2>
        <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
          <p><strong>Name: </strong> {userInfo?.name}</p>
          <p><strong>Email: </strong> {userInfo?.email}</p>
        </div>
      </div>
      <div style={{ flex: '3 1 600px' }}>
        <h2>My Orders</h2>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <div style={{ color: 'var(--danger-color)' }}>{error?.data?.message || error.error}</div>
        ) : (
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>DATE</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>TOTAL</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>PAID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '15px' }}>{order._id}</td>
                  <td style={{ padding: '15px' }}>{order.createdAt.substring(0, 10)}</td>
                  <td style={{ padding: '15px' }}>${order.totalPrice}</td>
                  <td style={{ padding: '15px' }}>
                    {order.isPaid ? order.paidAt.substring(0, 10) : <span style={{ color: 'var(--danger-color)' }}>Not Paid</span>}
                  </td>
                  <td style={{ padding: '15px' }}>
                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : <span style={{ color: 'var(--danger-color)' }}>Not Delivered</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
