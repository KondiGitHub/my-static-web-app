import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ConfigContext } from '../ConfigContext';
import Header from "./Header";
import { UserContext } from '../UserContext';
import './Order.css'; // Import the CSS file

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});
  const config = useContext(ConfigContext);
  const { user } = useContext(UserContext);

  axios.interceptors.response.use(
    response => response, // Pass through successful responses
    error => {
      if (error.response && error.response.status === 401) {
        // Handle 401 status without throwing
        console.warn('Session expired or unauthorized.');
        return Promise.resolve({ status: 401, data: null });
      }
      return Promise.reject(error); // Throw other errors
    }
  );


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.NODE_SERVICE}/api/orders/?email=${user.email}`,{ withCredentials: true });
        if (response.status === 401) {
          console.warn("Unauthorized access");
        } else if (response.data) {
          console.log(response.data);
          setOrders(response.data);
        } else {
          console.error("Session check failed: no session");
        }
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [config, user]);

  const toggleOrderDetails = (orderNumber) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderNumber]: !prevState[orderNumber],
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="orders-page">
      <Header title={"Order Page"} />
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found for {user.email}</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.orderNumber} className="order-card">
              <div
                onClick={() => toggleOrderDetails(order.orderNumber)}
                className="order-header"
              >
                <span>Order Number: {order.orderNumber}</span>
                <span>{expandedOrders[order.orderNumber] ? '▲' : '▼'}</span>
              </div>

              {expandedOrders[order.orderNumber] && (
                <div>
                  <div className="order-section">
                    <strong>Items:</strong>
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <img src={item.src} alt={item.title} />
                        <span>
                          {index + 1}. {item.title} - ${item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="order-section">
                    <strong>Purchase Date:</strong> {new Date(order.purchaseDate).toLocaleDateString()}
                  </div>
                  <div className="order-section">
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </div>
                  <div className="order-section">
                    <strong>Payment Status:</strong> {order.purchaseStatus}
                  </div>
                  <div>
                    <strong>Payment Tracking ID:</strong> {order.paymentTrackId}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
