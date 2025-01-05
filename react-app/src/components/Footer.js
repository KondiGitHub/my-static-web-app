import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

function Footer({ title}) {
  
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
