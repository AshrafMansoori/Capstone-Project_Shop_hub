import React from 'react';
import { useGetOrdersQuery } from '../../slices/apiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div style={{ color: 'var(--danger-color)' }}>{error?.data?.message || error.error}</div>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>USER</th>
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
                <td style={{ padding: '15px' }}>{order.user && order.user.name}</td>
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
    </>
  );
};

export default OrderListScreen;
