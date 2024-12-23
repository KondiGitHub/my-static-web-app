import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { CartContext } from "../CartContext";
import './Header.css'


function Header({ title, showCart = true }) {
  const { user } = useContext(UserContext);
  const { cartCount } = useContext(CartContext);

  return (
    <header className="header">
      <h1 className="header-h1">{title}</h1> {/* Use the passed title prop */}
      <div className="header-buttons">
        <Link to="/signup">Sign Up</Link>
        {user ? <span>Welcome, {user.name}!</span> : <Link to="/login">Sign In</Link>}
        {showCart && <Link to="/cart">Cart ({cartCount})</Link>} {/* Conditionally show cart */}
      </div>
    </header>
  );
}

export default Header;
