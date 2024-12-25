import React,{useContext,useState } from 'react';
import { UserContext } from '../UserContext';
import './Profile.css'
//import { useNavigate  } from 'react-router-dom';

const AccountProfilePage = () => {
  const { user, logout } = useContext(UserContext);
 // const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false); 


  const handleExpand = () => {
    setExpanded(!expanded);
  }

  const handleLogout = () => {
    logout();
    //navigate("/login"); // Redirect to login page after logout
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
