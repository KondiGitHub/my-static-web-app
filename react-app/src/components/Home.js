import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'; // Import your CSS file
import Header from "./Header";

const Home = (props) => (
  <div>
    < Header title={"Welcome to Ammulu Arts"} />
 <nav>
    <h1>Welcome to Our App</h1>
    <ul>
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
  </div>
 
);

export default Home;
