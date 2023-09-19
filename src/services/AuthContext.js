import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Cookies.get('isLoggedIn') === 'true';
  });

  const simulateLogin = () => {
    setIsLoggedIn(true);
    Cookies.set('isLoggedIn', 'true', { expires: 365 });
  };

  const simulateLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, simulateLogin, simulateLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
