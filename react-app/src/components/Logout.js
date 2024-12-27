// Logout.js
import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { ConfigContext } from '../ConfigContext';

const Logout = () => {
  const { logout } = useContext(UserContext);
  const config = useContext(ConfigContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${config.NODE_SERVICE}/api/logout`, {}, { withCredentials: true });
      logout();
      alert('Logged out successfully');
    } catch (err) {
      alert('Logout failed');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
