import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // Access user from context

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <div className="flower-body">
      <header className="header">
        <h1 className="header-h1">Shopping Cart</h1>
        <div className="header-buttons">
          {/* Display "Sign Up" link if user is not logged in */}
          {!user && <Link to="/signup">Sign Up</Link>}

          {/* Display welcome message or "Sign In" link based on user status */}
          {user ? (
            <span>Welcome, {user.name}!</span>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </div>
      </header>

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
                <p>${item.price}</p>
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
            <Link to="/payment">Go to Payment</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
