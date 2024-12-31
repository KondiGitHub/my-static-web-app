import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

function Footer({ title}) {
  // const { user } = useContext(UserContext);
  // const { cartCount  } = useContext(CartContext);


  // axios.interceptors.response.use(
  //   response => response, // Pass through successful responses
  //   error => {
  //     if (error.response && error.response.status === 401) {
  //       // Handle 401 status without throwing
  //       console.warn('Session expired or unauthorized.');
  //       return Promise.resolve({ status: 401, data: null });
  //     }
  //     return Promise.reject(error); // Throw other errors
  //   }
  // );

  // useEffect(() => {
  //   if (cartCount !== cart.length) { // Use cart.length if cart is an array
  //     setCartCount(cart.length);    // Update using the context method
  //   }
  // }, [cart, cartCount, setCartCount]);


  // useEffect(() => {

  //   const getSession = async () => {
  //     if(!sessionCheck)
  //     {
  //       try {
  //         const res = await axios.get(`${config.NODE_SERVICE}/session-check`, { withCredentials: true });
  //         if (res.status === 401) {
  //           console.warn("Unauthorized access");
  //         } else if (res.data?.user) {
  //           login(res.data.user);
  //           setSessionCheck("done");
  //         } else {
  //           console.error("Session check failed: no session");
  //         }
  //       } catch (err) {
  //         console.error('An unexpected error occurred:', err);
  //       }
  //     }
     
  //   };

  //   getSession();

  // }, [config.NODE_SERVICE,login,sessionCheck]);

  return (
    <header className="footer">
       <div className="header-left">


       <Link to="/AmmuArts">
          <img src="/AmmuArts.jpg" alt="Ammu Arts Logo" className="brand-logo" />
        </Link>
        </div>
      <h1 className="header-h1">{title}</h1> {/* Use the passed title prop */}
      <div className="header-buttons">
      <Link to="/privacy-policy">Privacy</Link>
      
        <Link to="/contact-us">Contact Us</Link>
      </div>
    </header>
  );
}

export default Footer;
