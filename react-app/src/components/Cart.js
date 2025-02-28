import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price * item.quantity), 0);

  return (
    <div className="flower-body">
      {/* Main Content */}
      <div className="main-content">
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div className="cart-items-container">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.src}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
                <p>price: ${item.price}</p>
                <p>quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="cart-summary">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button onClick={clearCart}>Clear Cart</button>
            <Link to="/payment">Purchase</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
