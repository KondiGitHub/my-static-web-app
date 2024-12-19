import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'; // Import your CSS file

const Home = (props) => (
  <nav>
    <h1>Welcome to Our App</h1>
    <ul>
      <li>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" className="nav-link">
          Sign Up
        </NavLink>
      </li>
      <li>
        <NavLink to="/photo-galary" className="nav-link">
        Photo-galary
        </NavLink>
      </li>
      <li>
        <NavLink to="/loanCaluclator" className="nav-link">
          Loan Calculator
        </NavLink>
      </li>
      <li>
        <NavLink to="/serverTest" className="nav-link">
          Server Test
        </NavLink>
      </li>
      <li>
        <NavLink to="/AmmuArts" className="nav-link">
          AmmuArts
        </NavLink>
      </li>
    </ul>
    {props.children}
  </nav>
);

export default Home;
