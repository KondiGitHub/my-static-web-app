import React, { createContext, useState } from 'react';

// Create UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details


  const login = (userData) => {
    setUser(userData);
    //localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    //localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
