// NODE_SERVICE=http://localhost:5000

import React, { createContext } from 'react';

// Create UserContext

export const ConfigContext = createContext();


  export const ConfigProvider = ({ children, config }) => {
    const defaultConfig = {
      ...config, // Allow overriding default values
    };
  
    return (
      <ConfigContext.Provider value={defaultConfig}>
        {children}
      </ConfigContext.Provider>
    );
  };