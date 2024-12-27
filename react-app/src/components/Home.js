import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'; // Ensure you style the page with this file
import Header from './Header';

const Home = (props) => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <Header title={"Welcome to Ammu Arts"} />

      {/* Navigation Section */}
      <nav className="nav-bar">
        <NavLink to="/AmmuArts" className="nav-link">
          Explore Ammu Arts
        </NavLink>
      </nav>

      {/* Description Section */}
      <section className="home-content">
        <h2>About Ammu Arts</h2>
        <p>
          <strong>Ammu Arts</strong> is a vibrant and creative platform where you can find 
          exquisite handmade art and craft works. Whether you're looking for a unique gift, 
          a piece to enhance your home decor, or simply want to celebrate the beauty of art, 
          we have something for everyone.
        </p>
        <p>
          Our collection features carefully crafted, one-of-a-kind artworks that are sure 
          to captivate your heart. Each piece tells its own story and embodies the love and 
          passion of our talented artisans. At Ammu Arts, we make it easy and delightful 
          to bring beauty into your life.
        </p>
      </section>

      {props.children}
    </div>
  );
};

export default Home;
