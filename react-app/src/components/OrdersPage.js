import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { ConfigContext } from '../ConfigContext';
import Header from "./Header";
import { UserContext } from '../UserContext';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const config = useContext(ConfigContext);
   const { user  } = useContext(UserContext); // Access context

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.NODE_SERVICE}/api/orders/?email=${user.email}`);
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [config, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
        < Header title={"Order Page"} />
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found for {user.email}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Order Number</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Items</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Purchase Date</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Total Price</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Payment Status</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Payment TrackingID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderNumber}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.orderNumber}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {order.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* Item Image */}
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} 
                    />
                    
                    {/* Item Details */}
                    <div>
                      {index + 1}. {item.title} - ${item.price}
                    </div>
                  </div>
                  ))}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{new Date(order.purchaseDate).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>${order.totalPrice}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.purchaseStatus}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.paymentTrackId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
