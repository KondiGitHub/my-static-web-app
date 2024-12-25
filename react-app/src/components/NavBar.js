import React from 'react';

const NavBar = (props) => (
  <nav className="column is-2 menu">
    <p className="menu-label">Menu</p>
    <ul className="menu-list">
      {/* <NavLink to="/products" activeClassName="active-link">
        Products
      </NavLink>
      <NavLink to="/about" activeClassName="active-link">
        About
      </NavLink> */}
      {/* <NavLink to="/loanCaluclator" activeClassName="active-link">
       loanCaluclator
      </NavLink> */}
    </ul>
    {props.children}
  </nav>
);

export default NavBar;
