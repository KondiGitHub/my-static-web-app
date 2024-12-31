import React, { useContext } from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { CartContext } from "../CartContext";
import AccountProfilePage from './AccountProfilePage';
import './Header.css'
import axios from 'axios'; // If you're using axios
import { ConfigContext } from '../ConfigContext';

function Header({ title, showCart = true }) {
  const { user,login } = useContext(UserContext);
  const { cartCount,cart,setCartCount  } = useContext(CartContext);
  const config = useContext(ConfigContext);
  const [sessionCheck, setSessionCheck] = useState(null);


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
    if (cartCount !== cart.length) { // Use cart.length if cart is an array
      setCartCount(cart.length);    // Update using the context method
    }
  }, [cart, cartCount, setCartCount]);


  useEffect(() => {

    const getSession = async () => {
      if(!sessionCheck)
      {
        try {
          const res = await axios.get(`${config.NODE_SERVICE}/session-check`, { withCredentials: true });
          if (res.status === 401) {
            console.warn("Unauthorized access");
          } else if (res.data?.user) {
            login(res.data.user);
            setSessionCheck("done");
          } else {
            console.error("Session check failed: no session");
          }
        } catch (err) {
          console.error('An unexpected error occurred:', err);
        }
      }
     
    };

    getSession();

  }, [config.NODE_SERVICE,login,sessionCheck]);

  return (
    <header className="header">
       <div className="header-left">


       <Link to="/AmmuArts">
          <img src="/AmmuArts.jpg" alt="Ammu Arts Logo" className="brand-logo" />
        </Link>
        </div>
      <h1 className="header-h1">{title}</h1> {/* Use the passed title prop */}
      <div className="header-buttons">
        <Link to="/signup">Sign Up</Link>
        {user ? <AccountProfilePage /> : <Link to="/login">Sign In</Link>}
        {showCart && <Link to="/cart">Cart ({cartCount})</Link>}
      </div>
    </header>
  );
}

export default Header;
