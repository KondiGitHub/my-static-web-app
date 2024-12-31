import React,{useContext,useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from "react-router-dom";
import './Profile.css'

const AccountProfilePage = () => {
  const { user, logout } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false); 


  const handleExpand = () => {
    setExpanded(!expanded);
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
    {user ? (
      <div>
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
          {/* Button with down/up arrow */}
          <button 
            onClick={handleExpand} 
            className="buttonStyle"
          >
            <span className="arrowStyle">{expanded ? '▲' : '▼'}</span> 
            Hello, {user.name}
          </button>
        </div>

        {/* Expandable Profile Info */}
        {expanded && (
          <div className="profileBoxStyle">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Link to="/orders">Orders</Link>
            {/* Add more user details if needed */}
            <button onClick={handleLogout} className="logoutButtonStyle">Logout</button>
          </div>
        )}
      </div>
    ) : (
      <button onClick={() => alert('Login functionality goes here')} className="loginButtonStyle">Login</button>
    )}
  </div>
  );
};

export default AccountProfilePage;
