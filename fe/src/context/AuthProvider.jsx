import { useState } from 'react';
import { AuthContext } from './authContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  const login = (tokenFromServer) => {
    // Simpan token string ke localStorage
    localStorage.setItem('accessToken', tokenFromServer);
    setToken(tokenFromServer);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;